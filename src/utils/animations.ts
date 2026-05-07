import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateOnScroll = (
  element: HTMLElement | null,
  animation: gsap.core.Tween | gsap.core.Timeline
) => {
  if (!element) return;

  ScrollTrigger.create({
    trigger: element,
    onEnter: () => animation.play(),
    onLeaveBack: () => animation.reverse(),
  });
};

export const createRevealAnimation = (element: HTMLElement | null) => {
  if (!element) return gsap.to({}, {});

  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 0.5,
      markers: false,
    },
    opacity: 1,
    y: 0,
    duration: 1,
  });
};

export const parallaxScroll = (element: HTMLElement | null, depth: number = 0.5) => {
  if (!element) return;

  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      onUpdate: (self) => {
        gsap.to(element, {
          y: self.getVelocity() * depth * 0.1,
          overwrite: 'auto',
          duration: 0.3,
        });
      },
    },
  });
};

export const magneticButton = (element: HTMLElement | null) => {
  if (!element) return;

  element.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    });
  });
};

export const staggerAnimation = (
  elements: NodeListOf<Element>,
  animation: { [key: string]: unknown },
  delay: number = 0.1
) => {
  return gsap.to(elements, {
    ...animation,
    stagger: delay,
  });
};

export const floatingAnimation = (element: HTMLElement | null, speed: number = 2) => {
  if (!element) return;

  gsap.to(element, {
    y: -20,
    duration: speed,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

export const pulseAnimation = (element: HTMLElement | null) => {
  if (!element) return;

  gsap.to(element, {
    scale: 1.05,
    opacity: 0.8,
    duration: 0.6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};

export const rotateAnimation = (element: HTMLElement | null, duration: number = 4) => {
  if (!element) return;

  gsap.to(element, {
    rotation: 360,
    duration,
    repeat: -1,
    ease: 'none',
  });
};

export const glitchAnimation = (element: HTMLElement | null) => {
  if (!element) return;

  const timeline = gsap.timeline({ repeat: -1 });

  timeline
    .to(element, {
      x: -5,
      duration: 0.05,
    }, 0)
    .to(element, {
      x: 5,
      duration: 0.05,
    }, 0.05)
    .to(element, {
      x: 0,
      duration: 0.05,
    }, 0.1)
    .to(element, {
      opacity: 0.8,
      duration: 0.05,
    }, 0)
    .to(element, {
      opacity: 1,
      duration: 0.05,
    }, 0.15);

  return timeline;
};

export const countAnimation = (
  element: HTMLElement | null,
  target: number,
  duration: number = 2
) => {
  if (!element) return;

  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration,
    onUpdate: () => {
      element.textContent = Math.floor(obj.value).toString();
    },
    ease: 'power2.out',
  });
};

export const typewriterAnimation = (element: HTMLElement | null, text: string, speed: number = 0.05) => {
  if (!element) return;

  element.textContent = '';
  const chars = text.split('');

  return gsap.to(chars, {
    duration: text.length * speed,
    onUpdate() {
      element.textContent = chars.join('');
    },
  });
};
