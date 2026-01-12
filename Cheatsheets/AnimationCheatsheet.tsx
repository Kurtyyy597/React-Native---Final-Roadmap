/**
 * animation.tsx
 * -----------------------------
 * React Native Animation + UI Cheatsheet
 * Focus:
 * - useEffect + requestAnimationFrame
 * - auto-scroll
 * - fade / slide / scale animations
 * - same-screen details UX
 *
 * Copy patterns from here into your components.
 */

import { useEffect, useRef } from "react";
import { Animated, ScrollView } from "react-native";

/* =========================================================
   🧠 REFS YOU WILL USUALLY CREATE
   ========================================================= */

// ScrollView ref (for auto-scroll)
export const scrollRef = useRef<ScrollView>(null);

// Stores Y position of details view (from onLayout)
export const detailsY = useRef<number>(0);

// Fade animation
export const fadeAnim = useRef(new Animated.Value(0)).current;

// Slide animation (Y-axis)
export const slideAnim = useRef(new Animated.Value(30)).current;

// Scale animation (pop-in)
export const scaleAnim = useRef(new Animated.Value(0.95)).current;

// Expand / collapse animation (height)
export const expandAnim = useRef(new Animated.Value(0)).current;

/* =========================================================
   1️⃣ AUTO-SCROLL WHEN DETAILS APPEAR
   ========================================================= */
/**
 * Use when:
 * - details appear BELOW the list
 * - details are conditionally rendered
 *
 * Requires:
 * - scrollRef
 * - detailsY (from onLayout)
 */
export const useAutoScrollToDetails = (selectedItem: any) => {
  useEffect(() => {
    if (!selectedItem) return;

    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        y: detailsY.current,
        animated: true,
      });
    });
  }, [selectedItem]);
};

/* =========================================================
   2️⃣ FADE IN / OUT
   ========================================================= */
/**
 * Use when:
 * - showing details
 * - subtle UI transitions
 */
export const useFadeAnimation = (visible: boolean) => {
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);
};

/* =========================================================
   3️⃣ SLIDE UP / DOWN
   ========================================================= */
/**
 * Use when:
 * - details slide from below
 * - bottom panels
 */
export const useSlideAnimation = (visible: boolean) => {
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : 30,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);
};

/* =========================================================
   4️⃣ SCALE (POP-IN EFFECT)
   ========================================================= */
/**
 * Use when:
 * - micro-interactions
 * - card focus
 */
export const useScaleAnimation = (visible: boolean) => {
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: visible ? 1 : 0.95,
      friction: 6,
      useNativeDriver: true,
    }).start();
  }, [visible]);
};

/* =========================================================
   5️⃣ EXPAND / COLLAPSE (HEIGHT)
   ========================================================= */
/**
 * Use when:
 * - expanding content vertically
 * - accordion / details section
 *
 * NOTE:
 * - useNativeDriver MUST be false for height
 */
export const useExpandAnimation = (visible: boolean) => {
  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [visible]);
};

/* =========================================================
   6️⃣ CHAINED EFFECT (SCROLL → FADE)
   ========================================================= */
/**
 * Use when:
 * - want premium UX
 * - scroll first, then animate
 */
export const useScrollThenFade = (selectedItem: any) => {
  useEffect(() => {
    if (!selectedItem) return;

    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        y: detailsY.current,
        animated: true,
      });

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [selectedItem]);
};

/* =========================================================
   7️⃣ HOW TO USE onLayout (VERY IMPORTANT)
   ========================================================= */
/**
 * Put this on the DETAILS view:
 *
 * onLayout={(e) => {
 *   detailsY.current = e.nativeEvent.layout.y;
 * }}
 *
 * This replaces measureLayout safely.
 */

/* =========================================================
   8️⃣ HOW TO APPLY ANIMATIONS IN JSX
   ========================================================= */
/**
 * <Animated.View
 *   style={{
 *     opacity: fadeAnim,
 *     transform: [
 *       { translateY: slideAnim },
 *       { scale: scaleAnim },
 *     ],
 *     maxHeight: expandAnim.interpolate({
 *       inputRange: [0, 1],
 *       outputRange: [0, 300],
 *     }),
 *     overflow: "hidden",
 *   }}
 * >
 */

/* =========================================================
   🔴 GOLDEN RULES (MEMORIZE)
   ========================================================= */
/**
 * ✔ useEffect → reacts to state
 * ✔ requestAnimationFrame → waits for render
 * ✔ onLayout → safest way to get position
 * ✔ find() → ONE object
 * ❌ measureLayout for conditional views
 * ❌ animate height with native driver
 */
