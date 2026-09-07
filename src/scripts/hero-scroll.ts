import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Evita recálculos bruscos en móviles por aparición/ocultamiento de la barra de navegación
ScrollTrigger.config({ ignoreMobileResize: true });

export function initHeroScroll(): () => void {
  if (typeof window === 'undefined' || window.innerWidth < 1024) {
    return () => {};
  }
  const sequence = document.getElementById('hero-sequence');
  if (!sequence || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const media = gsap.matchMedia();

  media.add('(min-width: 1024px)', () => {
    const heroCopy = document.getElementById('hero-initial-copy');
    const scrollCue = document.getElementById('hero-scroll-cue');
    const ecosystem = document.getElementById('hero-ecosystem-stage');
    const ecosystemHeader = document.getElementById('hero-ecosystem-stage-header');
    const constellation = document.getElementById('hero-ecosystem-stage-grid');
    const satellites = gsap.utils.toArray<HTMLElement>('#hero-ecosystem-stage .orbital-satellite');

    gsap.set(ecosystem, { autoAlpha: 0, pointerEvents: 'none' });
    // GSAP conserva explícitamente el centrado CSS al animar el transform.
    gsap.set(ecosystemHeader, { autoAlpha: 0, xPercent: -50, yPercent: -50, y: 20 });
    gsap.set(constellation, {
      autoAlpha: 0,
      xPercent: -50,
      yPercent: -50,
      scale: 0.94,
      transformOrigin: 'center center',
    });
    gsap.set(satellites, { autoAlpha: 0, scale: 0.9, transformOrigin: 'center center' });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sequence,
        start: 'top top',
        end: 'bottom bottom',
        // Una inercia ligera evita cambios bruscos al variar la velocidad de rueda.
        scrub: 1.15,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to([heroCopy, scrollCue], { autoAlpha: 0, y: -20, duration: 0.3, ease: 'power2.inOut' }, 0.04)
      .set(ecosystem, { autoAlpha: 1, pointerEvents: 'auto' }, 0.38)
      .to(ecosystemHeader, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out' }, 0.44)
      .to(ecosystemHeader, { autoAlpha: 0, y: -16, duration: 0.28, ease: 'power2.inOut' }, 1.15)
      .to(constellation, { autoAlpha: 1, scale: 1, duration: 0.42, ease: 'power2.out' }, 1.25)
      .to(satellites, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.32,
        stagger: 0.1,
        ease: 'power2.out',
      }, 1.4)
      // Mantiene la constelación visible durante el tramo final del scroll.
      .to({}, { duration: 0.9 }, 2.1);

    return () => timeline.kill();
  });

  ScrollTrigger.refresh();
  return () => media.revert();
}
