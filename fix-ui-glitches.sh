#!/bin/bash

# =================================================================================
# SCRIPT TO FIX UI VISUAL GLITCHES
# =================================================================================
# This script addresses two distinct visual issues in the portfolio project:
# 1. Removes `bg-transparent` from the Projects section to ensure it adopts
#    the global alternating section background theme from globals.css.
# 2. Removes opacity modifiers (e.g., /80, /60) from card backgrounds across
#    multiple components to make them solid, preventing the section background
#    from bleeding through and creating a "double box" effect.
# =================================================================================

echo "Starting UI fix process..."

# --- FIX 1: Correcting the Projects Section Background ---
# The `bg-transparent` class was causing the main body background to show
# instead of the intended section-specific background. Removing it allows
# the styles from `globals.css` (section:nth-child) to apply correctly.
echo "Fixing Projects section background in src/components/sections/Projects.tsx..."
sed -i 's/className="py-20 relative overflow-hidden bg-transparent"/className="py-20 relative overflow-hidden"/' src/components/sections/Projects.tsx

# --- FIX 2: Making Card Backgrounds Solid (Opaque) ---
# The opacity modifiers on background utilities (e.g., bg-white/80) are
# removed to make the card backgrounds solid. This provides a cleaner look
# and resolves the visual glitch of a "stiff square background".

echo "Fixing card background opacity in src/components/sections/Projects.tsx..."
sed -i 's/bg-white\/80 dark:bg-gray-800\/80/bg-white dark:bg-gray-800/g' src/components/sections/Projects.tsx

echo "Fixing card background opacity in src/components/sections/Services.tsx..."
sed -i 's/bg-white\/60 dark:bg-gray-800\/60/bg-white dark:bg-gray-800/g' src/components/sections/Services.tsx

echo "Fixing card background opacity in src/components/sections/Skills.tsx..."
sed -i 's/bg-white\/80 dark:bg-gray-800\/80/bg-white dark:bg-gray-800/g' src/components/sections/Skills.tsx


echo "================================================================================="
echo "✅ UI Fixes Applied Successfully!"
echo "The section background and card opacity issues should now be resolved."
echo "Please rebuild your project to see the changes."
echo "================================================================================="