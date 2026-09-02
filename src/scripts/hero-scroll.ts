import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHeroScroll(): () => void {
  const sequence = document.getElementById('hero-sequence');
  if (!sequence || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const media = gsap.matchMedia();

  media.add('(min-width: 1024px)', () => {
    const heroCopy = document.getElementById('hero-initial-copy');
    const scrollCue = document.getElementById('hero-scroll-cue');
    const productStage = document.getElementById('hero-stage-motion');
    const halo = document.getElementById('stage-organic-halo');
    const closedLayer = document.getElementById('layer-portacuentas-closed');
    const openLayer = document.getElementById('layer-portacuentas-open');
    const description = document.getElementById('hero-portacuentas-desc');
    const ecosystem = document.getElementById('hero-ecosystem-stage');
    const ecosystemHeader = document.getElementById('hero-ecosystem-stage-header');
    const constellation = document.getElementById('hero-ecosystem-stage-grid');
    const satellites = gsap.utils.toArray<HTMLElement>('#hero-ecosystem-stage .orbital-satellite');

    gsap.set(openLayer, { autoAlpha: 0, rotateY: 16, scale: 0.98, force3D: true });
    gsap.set(closedLayer, { autoAlpha: 1, rotateY: 0, scale: 1, force3D: true });
    gsap.set(description, { autoAlpha: 0, y: 24, pointerEvents: 'none' });
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
      .to(closedLayer, { rotateY: -16, autoAlpha: 0, scale: 0.97, duration: 0.36, ease: 'power1.inOut' }, 0.14)
      .to(openLayer, { rotateY: 0, autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power1.out' }, 0.18)
      .to(halo, { scale: 1.1, duration: 0.4, ease: 'power1.out' }, 0.18)
      .to(description, { autoAlpha: 1, y: 0, pointerEvents: 'auto', duration: 0.32, ease: 'power2.out' }, 0.34)
      .to([description, productStage], { autoAlpha: 0, y: -14, duration: 0.24, ease: 'power2.inOut' }, 1.16)
      .to(halo, { autoAlpha: 0, scale: 0.94, duration: 0.24, ease: 'power2.inOut' }, 1.18)
      .set(ecosystem, { autoAlpha: 1, pointerEvents: 'auto' }, 1.44)
      .to(ecosystemHeader, { autoAlpha: 1, y: 0, duration: 0.38, ease: 'power2.out' }, 1.5)
      .to(ecosystemHeader, { autoAlpha: 0, y: -16, duration: 0.28, ease: 'power2.inOut' }, 2.24)
      .to(constellation, { autoAlpha: 1, scale: 1, duration: 0.42, ease: 'power2.out' }, 2.36)
      .to(satellites, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.32,
        stagger: 0.1,
        ease: 'power2.out',
      }, 2.52)
      // Mantiene la constelación visible durante el tramo final del scroll.
      .to({}, { duration: 0.9 }, 3.3);

    return () => timeline.kill();
  });

  media.add('(max-width: 1023px)', () => {
    const heroCopy = document.getElementById('hero-initial-copy');
    const scrollCue = document.getElementById('hero-scroll-cue');
    const productStage = document.getElementById('hero-stage-motion');
    const closedLayer = document.getElementById('layer-portacuentas-closed');
    const openLayer = document.getElementById('layer-portacuentas-open');
    const description = document.getElementById('hero-portacuentas-desc');
    const closedContext = document.getElementById('hero-mobile-context-closed');
    const openContext = document.getElementById('hero-mobile-context-open');

    gsap.set(openLayer, { autoAlpha: 0, scale: 0.97, force3D: true });
    gsap.set(closedLayer, { autoAlpha: 1, scale: 1, force3D: true });
    gsap.set(description, { autoAlpha: 0, y: 20, pointerEvents: 'none' });
    gsap.set(openContext, { autoAlpha: 0, y: 6 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sequence,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to([heroCopy, scrollCue], { autoAlpha: 0, y: -20, duration: 0.24, ease: 'power2.inOut' }, 0.08)
      .to(closedLayer, { autoAlpha: 0, scale: 0.96, duration: 0.3, ease: 'power1.inOut' }, 0.22)
      .to(closedContext, { autoAlpha: 0, y: -6, duration: 0.2, ease: 'power1.inOut' }, 0.22)
      .to(openLayer, { autoAlpha: 1, scale: 1, duration: 0.34, ease: 'power2.out' }, 0.28)
      .to([description, openContext], { autoAlpha: 1, y: 0, pointerEvents: 'auto', duration: 0.32, ease: 'power2.out' }, 0.34)
      .to(productStage, { y: -84, scale: 0.86, duration: 0.42, ease: 'power2.out' }, 0.54)
      .to({}, { duration: 0.1 }, 0.98);

    return () => timeline.kill();
  });

  ScrollTrigger.refresh();
  return () => media.revert();
}
