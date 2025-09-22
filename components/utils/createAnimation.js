import { Animation } from "babylonjs";
import { CubicEase, EasingFunction } from "babylonjs";

const FRAMES_PER_SECOND = 60;

const createAnimation=({ property, from, to }) =>{
  const ease = new CubicEase();
  ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);

  const animation = Animation.CreateAnimation(
    property,
    Animation.ANIMATIONTYPE_FLOAT,
    FRAMES_PER_SECOND,
    ease
  );
  animation.setKeys([
    {
      frame: 0,
      value: from,
    },
    {
      frame: 100,
      value: to,
    },
  ]);

  return animation;
}
export default createAnimation;