import type { SuiteBookingCopy } from './suite-booking';

export type CottageCopy = {
	slug: CottageSlug;
	hero: {
		image: string;
		imageAlt: string;
		kicker: string;
		title: string;
	};
	intro: {
		kicker: string;
		heading: string;
		paragraphs: string[];
		sideImage: { src: string; alt: string };
	};
	highlights: { icon: string; title: string; description: string }[];
	booking: SuiteBookingCopy;
};

export type CottageSlug =
	| 'mariposa-cottage'
	| 'colibri-cottage'
	| 'poas-cottage'
	| 'morpho-cottage';
