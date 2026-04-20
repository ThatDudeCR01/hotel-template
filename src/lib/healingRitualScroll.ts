import type { Action } from 'svelte/action';

export type HealingRitualScrollParams = {
	/** from-right: texto entra desde la derecha y se fija (rituales 1 y 3). from-left: lo contrario (ritual 2). */
	direction?: 'from-right' | 'from-left';
};

/**
 * Texto ligado al scroll: desplazamiento horizontal + opacidad.
 * Misma lógica para los tres bloques; la dirección invierte el eje X en el segundo.
 */
export const healingRitualScroll: Action<
	HTMLElement,
	HealingRitualScrollParams | undefined
> = (node, params) => {
	const text = node.querySelector<HTMLElement>('.healing-ritual__text');
	if (!text) return { destroy() {} };

	let direction: 'from-right' | 'from-left' = params?.direction ?? 'from-right';

	const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
	if (mq.matches) {
		text.style.transform = '';
		text.style.opacity = '1';
		return { destroy() {} };
	}

	const MAX_SHIFT_PX = 120;

	let rafId = 0;

	const tick = () => {
		const rect = node.getBoundingClientRect();
		const vh = window.innerHeight;
		const w = window.innerWidth;
		const maxShift = Math.min(MAX_SHIFT_PX, w * 0.2);

		const startLine = vh * 0.9;
		const endLine = vh * 0.2;
		let p = (startLine - rect.top) / (startLine - endLine);
		p = Math.max(0, Math.min(1, p));

		const magnitude = (1 - p) * maxShift;
		const tx = direction === 'from-right' ? magnitude : -magnitude;
		const op = 0.22 + p * 0.78;

		text.style.transform = `translate3d(${tx}px, 0, 0)`;
		text.style.opacity = String(op);
	};

	const schedule = () => {
		if (!rafId) {
			rafId = requestAnimationFrame(() => {
				rafId = 0;
				tick();
			});
		}
	};

	tick();
	window.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('resize', schedule, { passive: true });

	return {
		update(newParams: HealingRitualScrollParams | undefined) {
			if (newParams?.direction) direction = newParams.direction;
			tick();
		},
		destroy() {
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			cancelAnimationFrame(rafId);
			text.style.transform = '';
			text.style.opacity = '';
		},
	};
};
