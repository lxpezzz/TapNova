# Performance notes

Measurements use `npm run build` on the same machine and production mode.

| Change | Baseline | Result | Verdict |
| --- | ---: | ---: | --- |
| Enable Astro's Sharp image pipeline and resize assets to their rendered dimensions | 1,494,850 B of generated images | 687,676 B | Kept: 54.0% less image output |
| Prioritize only the initially visible hero product | 306,810 B marked eager/high priority | 30,330 B marked eager/high priority | Kept: 90.1% less high-priority image data |
| Load GSAP/ScrollTrigger after first scroll intent or browser idle time | 119,564 B initial JS (46,670 B gzip) | 1,635 B initial JS (874 B gzip) | Kept: 98.6% less critical JS; animation chunk remains 119,440 B and loads on demand |
| Remove the header scroll handler whose `.scrolled` styles were identical | One listener and animation-frame callback on every scroll | No header scroll work | Kept: removes redundant main-thread work |
| Skip the desktop sticky-explainer handler below 992 px | Scroll calculations ran on mobile against a hidden track | No explainer scroll handler on mobile | Kept: removes redundant mobile work |

## Verification

- `npm run build`: passes.
- `npm exec -- tsc --noEmit`: passes.
- `npm audit --omit=dev --offline`: 0 known vulnerabilities in the lockfile cache.
- Production preview: `/` and the deferred animation chunk both return HTTP 200.

## Follow-up candidates

- Capture Lighthouse and real-user Web Vitals after deployment; local build sizes do not establish LCP, INP, or CLS on representative networks.
- Connect the sample form to a real endpoint. It currently prevents submission and displays a simulated success state.
- Add real legal/privacy/cookie routes; the footer links are placeholders.
- The unused `HeroClyde.astro` and `EcosystemTransition.astro` prototypes were removed to reduce maintenance surface. They were not part of the production bundle.
