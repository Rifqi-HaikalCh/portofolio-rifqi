'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useParallaxStage } from '../../hooks/useParallaxStage';
import { DeskLamp } from './DeskLamp';
import { FigurineSlot } from './FigurineSlot';
import { LampArt } from './LampArt';
import { LaptopScreenUI, type ScreenData } from './LaptopScreenUI';
import { DeskLayer } from './layers/DeskLayer';
import { FrontLayer } from './layers/FrontLayer';
import { WallLayer } from './layers/WallLayer';
import { FIGURINE, SCREEN, STAGE, stageBox } from './stage-geometry';

/*
  The front-desk diorama (DesignRules.md §4 `01`, §9).
  ≥ 768 px: the full 16/10 stage, L1 wall → L2 desk, laptop, figurine, lamp → L3 props.
  < 768 px: only the laptop screen renders, as a compact paper laptop card.
  One LaptopScreenUI element in both cases; CSS decides where it sits.
*/

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

const screenVars = {
  '--screen-x': pct(SCREEN.x, STAGE.width),
  '--screen-y': pct(SCREEN.y, STAGE.height),
  '--screen-w': pct(SCREEN.w, STAGE.width),
  '--screen-h': pct(SCREEN.h, STAGE.height),
} as CSSProperties;

export function PaperDeskStage({ screen, poster }: { screen: ScreenData; poster: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  useParallaxStage(stageRef);

  return (
    <div ref={stageRef} className="paper-stage relative isolate md:aspect-[16/10]" style={screenVars}>
      <div className="hidden md:block">
        <span className="stage-marks" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <div className="absolute inset-0 overflow-hidden border border-line bg-(--ill-wall)">
          <WallLayer className="stage-layer stage-l1" />
          <DeskLayer className="stage-layer" />
          <div className="stage-layer stage-fig">
            <div className="absolute" style={stageBox(FIGURINE)}>
              <FigurineSlot
                title={language === 'en' ? 'Paper figurine of Rifqi at his desk' : 'Figur kertas Rifqi di mejanya'}
                poster={poster}
              />
            </div>
          </div>
          <LampArt className="stage-layer" />
          <FrontLayer className="stage-layer stage-l3" />
        </div>
        <DeskLamp />
      </div>

      <LaptopScreenUI
        screen={screen}
        className="relative z-scene-mid md:absolute md:top-(--screen-y) md:left-(--screen-x) md:h-(--screen-h) md:w-(--screen-w)"
      />
    </div>
  );
}
