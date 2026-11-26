'use client';

import React, { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from 'react';
import { useHydrated } from '../../hooks/useHydrated';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { RifqiFigurine } from '../scene/RifqiFigurine';
import type { Expression, PoseId } from '../scene/figurine-parts';
import { play } from '../../lib/sound/control';
import { EQBOT_OPEN_EVENT, emitEqbotState } from '../scene/scene-events';
import { scrollToStudioSection, useStudio } from './StudioProvider';
import {
  eqbotCopy,
  eqbotNodes,
  eqbotPlaceOf,
  eqbotSectionNode,
  eqbotSee,
  type EqbotChoice,
  type EqbotPlace,
} from './eqbot-script';

type Turn = { who: 'bot' | 'you'; en: string; idn: string; place?: EqbotPlace };
type Phase = 'shut' | 'fly' | 'grow' | 'open' | 'shrink';
type Rest = 'logo' | 'tab';
type Flyer = { top: number; left: number; size: number };

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function EqbotFace({ expression = 'neutral' }: { expression?: Expression }) {
  // Head crop of the same paper puppet as the hero (DesignRules §2.6); the
  // expression swaps face parts only (DesignRules.md §2.7).
  return <RifqiFigurine crop="head" expression={expression} className="h-full w-full" />;
}

function downloadCv() {
  const link = document.createElement('a');
  link.href = '/assets/Rifqi Haikal Chairiansyah-CV.pdf';
  link.download = 'Rifqi Haikal Chairiansyah-CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function openPlace(place: EqbotPlace) {
  scrollToStudioSection(place);
}

type GreetBeat = 0 | 1 | 2 | 3;

export function EqbotCompanion() {
  const { t } = useLanguage();
  const text = (en: string, idn: string) => {
    const value = t(en, idn);
    return typeof value === 'string' ? value : en;
  };
  const { activeId } = useStudio();
  const ready = useHydrated();
  const [phase, setPhase] = useState<Phase>('shut');
  const [rest, setRest] = useState<Rest>('logo');
  const [flyer, setFlyer] = useState<Flyer | null>(null);
  const [log, setLog] = useState<Turn[]>([]);
  const [nodeId, setNodeId] = useState('menu');
  const [waiting, setWaiting] = useState(false);
  const [notice, setNotice] = useState(false);
  const [greetBeat, setGreetBeat] = useState<GreetBeat>(0);
  const seen = useRef(new Set<string>());
  const offeredPlace = useRef(new Set<string>());
  const answers = useRef(0);
  const hops = useRef(0);
  const saidThorough = useRef(false);
  const saidRestless = useRef(false);
  const opened = useRef(false);
  const introDone = useRef(false);
  const chose = useRef(false);
  const leftEarly = useRef(false);
  const waitTimer = useRef(0);
  const introTimer = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const tabAvatarRef = useRef<HTMLSpanElement>(null);
  const avatarRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const show = window.setTimeout(() => setNotice(true), 600);
    const hide = window.setTimeout(() => setNotice(false), 8600);
    return () => {
      window.clearTimeout(waitTimer.current);
      window.clearTimeout(introTimer.current);
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    const node = logRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [log, waiting, phase]);


  useLayoutEffect(() => {
    if (phase !== 'fly') return undefined;
    const from = (rest === 'tab' ? tabAvatarRef.current : launchRef.current);
    const to = avatarRef.current;
    if (!from || !to) {
      setPhase('grow');
      return undefined;
    }
    const start = from.getBoundingClientRect();
    const end = to.getBoundingClientRect();
    setFlyer({ top: start.top, left: start.left, size: start.width });
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlyer({ top: end.top, left: end.left, size: end.width });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [phase, rest]);

  useEffect(() => {
    if (phase !== 'fly' && phase !== 'grow' && phase !== 'shrink') return undefined;
    const delay = reducedMotion() ? 0 : phase === 'fly' ? 520 : 450;
    const timer = window.setTimeout(() => {
      setPhase((current) => {
        if (phase === 'fly' && current === 'fly') return 'grow';
        if (phase === 'grow' && current === 'grow') return 'open';
        if (phase === 'shrink' && current === 'shrink') return 'shut';
        return current;
      });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const greeting = (): Turn => {
    const hour = new Date().getHours();
    let copy = eqbotCopy.first;
    if (!opened.current) {
      if (hour >= 23 || hour < 5) copy = eqbotCopy.night;
      else if (hour < 11) copy = eqbotCopy.morning;
    } else if (leftEarly.current) {
      copy = eqbotCopy.left;
    } else {
      copy = eqbotCopy.return;
    }
    opened.current = true;
    leftEarly.current = false;
    return { who: 'bot', ...copy };
  };

  const choicesFor = (id: string): EqbotChoice[] => {
    const node = eqbotNodes[id];
    if (!node) return [];
    if (id === 'menu') {
      const here = eqbotSectionNode[activeId];
      if (!here) return node.choices;
      return [
        { id: 'here', en: eqbotCopy.here.en, idn: eqbotCopy.here.idn, to: here },
        ...node.choices.filter((choice) => choice.to !== here),
      ];
    }
    if (node.choices.some((choice) => choice.silent && choice.to === 'menu')) return node.choices;
    return [
      ...node.choices,
      { id: `${id}-sections`, en: 'Another section', idn: 'Bagian lain', to: 'menu', silent: true },
    ];
  };

  // Playful multi-beat greeting choreography when the chat opens.
  useEffect(() => {
    if ((phase !== 'grow' && phase !== 'open') || reducedMotion()) return undefined;
    const t0 = window.setTimeout(() => setGreetBeat(1), 40);
    const t1 = window.setTimeout(() => setGreetBeat(2), 520);
    const t2 = window.setTimeout(() => setGreetBeat(3), 1020);
    const t3 = window.setTimeout(() => setGreetBeat(0), 2240);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [phase]);

  const openChat = () => {
    if (phase !== 'shut') return;
    setNotice(false);
    if (log.length === 0) {
      const firstGreeting = greeting();
      if (!introDone.current) {
        introDone.current = true;
        if (reducedMotion()) {
          setLog([firstGreeting, { who: 'bot', ...eqbotCopy.introFollow }]);
        } else {
          setLog([firstGreeting]);
          window.clearTimeout(introTimer.current);
          introTimer.current = window.setTimeout(() => {
            setLog((prev) => (prev.length === 1 ? [...prev, { who: 'bot', ...eqbotCopy.introFollow }] : prev));
            play('pop');
          }, 760);
        }
      } else {
        setLog([firstGreeting]);
      }
      setNodeId('menu');
    }
    setPhase(reducedMotion() ? 'open' : 'fly');
  };

  const closeToTab = () => {
    if (phase === 'shut' || phase === 'shrink') return;
    window.clearTimeout(introTimer.current);
    setGreetBeat(0);
    if (!chose.current) {
      leftEarly.current = true;
      setLog([]);
      setNodeId('menu');
      seen.current.delete('menu');
    }
    setFlyer(null);
    setRest('tab');
    setPhase(reducedMotion() ? 'shut' : 'shrink');
  };

  // The hero figurine holds a "thinking" pose while the sheet is open.
  const sheetOpen = phase !== 'shut';
  useEffect(() => {
    emitEqbotState(sheetOpen);
  }, [sheetOpen]);

  // Escape closes to the tab. useEffectEvent reads the latest closeToTab without re-subscribing.
  const onEscape = useEffectEvent(() => closeToTab());

  useEffect(() => {
    if (phase === 'shut') return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onEscape();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  // Other parts of the page (the laptop screen's "Ask EQbot") open the sheet with this event.
  const onOpenRequest = useEffectEvent(() => openChat());

  useEffect(() => {
    const onOpen = () => onOpenRequest();
    window.addEventListener(EQBOT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(EQBOT_OPEN_EVENT, onOpen);
  }, []);

  const choose = (choice: EqbotChoice) => {
    if (waiting || phase !== 'open') return;
    const nextId = choice.to;
    if (!nextId || !eqbotNodes[nextId]) return;
    chose.current = true;
    if (choice.silent) {
      setNodeId(nextId);
      return;
    }
    const node = eqbotNodes[nextId];
    const notes: Turn[] = [];
    if (node.section) {
      hops.current += 1;
      if (hops.current >= 3 && answers.current === 0 && !saidRestless.current) {
        saidRestless.current = true;
        notes.push({ who: 'bot', ...eqbotCopy.restless });
      }
    }
    if (node.answer) {
      answers.current += 1;
      if (answers.current === 4 && !saidThorough.current) {
        saidThorough.current = true;
        notes.push({ who: 'bot', ...eqbotCopy.thorough });
      }
    }
    const repeated = seen.current.has(nextId) && node.again;
    seen.current.add(nextId);
    const say = repeated && node.again ? node.again : node.say;
    const reply: Turn = { who: 'bot', ...say };
    const place = eqbotPlaceOf(nextId, node);
    const firstForSection = Boolean(place) && !offeredPlace.current.has(place as string);
    if (place && firstForSection) offeredPlace.current.add(place);
    const see: Turn | null = place && firstForSection ? { who: 'bot', ...eqbotSee(place), place } : null;

    setLog((prev) => [...prev, { who: 'you', en: choice.en, idn: choice.idn }]);
    setNodeId(nextId);
    setWaiting(true);
    window.clearTimeout(waitTimer.current);
    waitTimer.current = window.setTimeout(() => {
      setLog((prev) => [...prev, ...notes, reply, ...(see ? [see] : [])]);
      setWaiting(false);
      play('pop');
      if (choice.download) downloadCv();
    }, reducedMotion() ? 0 : 900);
  };

  const jumpTo = (place: EqbotPlace) => {
    if (phase === 'shut' || phase === 'shrink') return;
    openPlace(place);
    closeToTab();
  };

  const choices = choicesFor(nodeId);
  const panelOpen = phase === 'grow' || phase === 'open';
  const lastTurn = log[log.length - 1];
  const mood: Expression =
    phase === 'shrink'
      ? 'wink'
      : greetBeat === 2
        ? 'wink'
        : greetBeat === 1 || greetBeat === 3
          ? 'smile'
          : waiting
            ? 'thinking'
            : log.length > 1 && lastTurn?.who === 'bot'
              ? 'smile'
              : 'neutral';
  const showFace = phase !== 'fly';
  // The host beside the chat (v3.9 + v3.29): playful stop-motion greeting sequence on open, thinks while "typing", opens a hand toward the answer.
  const botTurns = log.filter((turn) => turn.who === 'bot').length;
  const lastBot = log.reduce((at, turn, index) => (turn.who === 'bot' ? index : at), -1);
  const hostPose: PoseId = waiting
    ? 'think'
    : greetBeat === 1
      ? 'wave'
      : greetBeat === 2
        ? 'explain'
        : greetBeat === 3
          ? 'wave'
          : log.length <= 2
            ? 'wave'
            : lastTurn?.who === 'bot'
              ? 'explain'
              : 'stand';
  const hostAct = waiting ? 'think' : greetBeat > 0 ? 'greet' : log.length <= 2 ? 'wave' : 'say';

  if (!ready) return null;

  return createPortal(
    <>
      <div className="eqbot-dock">
        {rest === 'logo' ? (
          <>
            {notice && phase === 'shut' && (
              <button type="button" className="eqbot-notice" onClick={openChat}>
                {text(eqbotCopy.notice.en, eqbotCopy.notice.idn)}
              </button>
            )}
            <button
              ref={launchRef}
              type="button"
              className={`eqbot-launcher${phase !== 'shut' ? ' is-hidden' : ''}`}
              aria-expanded={phase !== 'shut'}
              aria-label={text(eqbotCopy.openLabel.en, eqbotCopy.openLabel.idn)}
              onClick={openChat}
            >
              <span className="eqbot-face-clip">
                <EqbotFace />
              </span>
              <i className="eqbot-presence" />
            </button>
          </>
        ) : (
          <div className={`eqbot-tab${phase !== 'shut' ? ' is-hidden' : ''}`}>
            <button type="button" className="eqbot-tab-open" onClick={openChat} aria-expanded={phase !== 'shut'}>
              <span className="eqbot-avatar" ref={tabAvatarRef}>
                <span className="eqbot-face-clip">
                  <EqbotFace />
                </span>
                <i className="eqbot-presence" />
              </span>
              <span className="eqbot-tab-copy">
                <span className="eqbot-name">{text(eqbotCopy.headerName.en, eqbotCopy.headerName.idn)}</span>
                <span className="eqbot-status">{text(eqbotCopy.ongoing.en, eqbotCopy.ongoing.idn)}</span>
              </span>
            </button>
            <button
              type="button"
              className="eqbot-tab-x"
              aria-label={text(eqbotCopy.close.en, eqbotCopy.close.idn)}
              onClick={() => setRest('logo')}
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
      {phase !== 'shut' && (
        <div className={`eqbot-scrim${panelOpen ? ' is-open' : ''}`} aria-hidden="true" onClick={closeToTab} />
      )}
      {phase !== 'shut' && (
        <div className={`eqbot-host${panelOpen ? ' is-open' : ''}`} aria-hidden="true">
          <div key={`${hostAct}-${botTurns}-${greetBeat}`} className="eqbot-host-figure" data-act={hostAct}>
            <RifqiFigurine crop="wide" pose={hostPose} expression={mood === 'wink' ? 'wink' : mood === 'smile' ? 'smile' : undefined} className="h-full w-full" />
          </div>
          {greetBeat > 0 && !waiting && (
            <div className="eqbot-greet-pop">
              <span className="eqbot-greet-tag">{text(eqbotCopy.greetingBubbleBadge.en, eqbotCopy.greetingBubbleBadge.idn)}</span>
              <span className="eqbot-greet-sub">{text(eqbotCopy.greetingSubBadge.en, eqbotCopy.greetingSubBadge.idn)}</span>
              <i className="eqbot-greet-spark s1" />
              <i className="eqbot-greet-spark s2" />
              <i className="eqbot-greet-spark s3" />
            </div>
          )}
          {waiting && (
            <span className="eqbot-thought">
              <span />
              <span />
              <span />
            </span>
          )}
        </div>
      )}
      {phase !== 'shut' && (
        <div className={`eqbot-panel${panelOpen ? ' is-open' : ''}`} role="dialog" aria-label="EQbot">
          <div className="eqbot-panel-bar">
            <div className="eqbot-id">
              <span className={`eqbot-avatar${greetBeat > 0 ? ' is-greeting' : ''}`} ref={avatarRef}>
                {showFace && (
                  <span className="eqbot-face-clip">
                    <EqbotFace expression={mood} />
                  </span>
                )}
                <i className="eqbot-presence" />
              </span>
              <span className="eqbot-tab-copy">
                <span className="eqbot-name">{text(eqbotCopy.headerName.en, eqbotCopy.headerName.idn)}</span>
                <span className="eqbot-status">{text(eqbotCopy.online.en, eqbotCopy.online.idn)}</span>
              </span>
            </div>
            <button
              type="button"
              onClick={closeToTab}
              aria-label={text(eqbotCopy.close.en, eqbotCopy.close.idn)}
              className="text-muted"
            >
              <X size={16} />
            </button>
          </div>
          <div ref={logRef} className="eqbot-log" aria-live="polite">
            {log.map((turn, index) => (
              turn.place ? (
                <button
                  key={`${turn.who}-${index}`}
                  type="button"
                  className={`eqbot-bot eqbot-jump${index === lastBot ? ' is-new' : ''}`}
                  onClick={() => jumpTo(turn.place as EqbotPlace)}
                >
                  {text(turn.en, turn.idn)}
                </button>
              ) : (
                <p key={`${turn.who}-${index}`} className={turn.who === 'you' ? 'eqbot-you' : `eqbot-bot${index === lastBot ? ' is-new' : ''}`}>
                  {text(turn.en, turn.idn)}
                </p>
              )
            ))}
            {waiting && (
              <p className="eqbot-bot eqbot-typing" aria-hidden="true">
                <span /><span /><span />
              </p>
            )}
          </div>
          {/* v3.12 (owner): the choices are one scrolling row, so the messages get the height. */}
          <div className="eqbot-options">
            <div className="eqbot-choices" role="group" aria-label={text('Questions', 'Pertanyaan')}>
            {choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                className="eqbot-choice"
                disabled={waiting || phase !== 'open'}
                onClick={() => choose(choice)}
              >
                {text(choice.en, choice.idn)}
              </button>
            ))}
            </div>
            <p className="eqbot-hint">{text(eqbotCopy.hint.en, eqbotCopy.hint.idn)}</p>
          </div>
        </div>
      )}
      {flyer && phase === 'fly' && (
        <span
          className="eqbot-flyer"
          style={{ top: flyer.top, left: flyer.left, width: flyer.size, height: flyer.size }}
        >
          <EqbotFace />
        </span>
      )}
    </>,
    document.body,
  );
}
