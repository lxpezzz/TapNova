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

    gsap.set(ecosystem, { autoAlpha: 0, pointerEvents: 'none' });
    // GSAP conserva explícitamente el centrado CSS al animar el transform.
    gsap.set(ecosystemHeader, { autoAlpha: 0, xPercent: -50, yPercent: -50, y: 24 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sequence,
        start: 'top top',
        end: 'bottom bottom',
        // Scrub ágil y reactivo (0.25s) para eliminar sensación de retardo o arrastre
        scrub: 0.25,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to([heroCopy, scrollCue], { autoAlpha: 0, y: -16, duration: 0.35, ease: 'power1.out' }, 0)
      .set(ecosystem, { autoAlpha: 1, pointerEvents: 'auto' }, 0.15)
      .to(ecosystemHeader, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power1.out' }, 0.2)
      .to({}, { duration: 0.25 }, 0.7);

    return () => timeline.kill();
  });

  ScrollTrigger.refresh();
  return () => media.revert();
}
