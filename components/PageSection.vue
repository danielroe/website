<script setup lang="ts">
import type { PageBlock } from '~/types/schema';

interface PageSectionProps {
	background?: PageBlock['background'];
	negativeMargin?: boolean;
	offsetNegativeMargin?: boolean;
}

withDefaults(defineProps<PageSectionProps>(), {
	background: 'pristine-white',
	negativeMargin: false,
	offsetNegativeMargin: false,
});
</script>
block-size: 100%;

<template>
	<div class="page-section" :class="[`bg-${background}`, { offset: offsetNegativeMargin, negative: negativeMargin }]">
		<ArtLines v-if="background === 'pristine-white-lines'" />
		<slot />
	</div>
</template>

<style lang="scss" scoped>
.page-section {
	--padding-base: var(--space-12);
	--nav-offset: var(--space-32);
	--negative-offset: var(--space-20);
	--negative: calc(-1 * var(--space-8));

	padding-block: var(--padding-base);

	&.offset {
		padding-block-end: var(--negative-offset);
	}

	&.negative {
		padding-block-start: 0;

		:deep(> :first-child) {
			position: relative;
			inset-block-start: var(--negative);
			margin-block-end: var(--negative);
		}
	}

	@media (width > 50rem) {
		--padding-base: var(--space-24);
		--nav-offset: var(--space-44);
		--negative-offset: var(--space-36);
		--negative: calc(-1 * var(--space-16));
	}

	@media (width > 68rem) {
		--padding-base: var(--space-28);
		--nav-offset: var(--space-28);
		--negative-offset: var(--space-48);
		--negative: calc(-1 * var(--space-36));
	}

	&:has(:last-child:is(.base-container > .base-divider)) {
		padding-block-end: 0;
	}
}

.header-container + .page-section {
	/* Extra padding block start for the fixed NavHeader on mobile */
	padding-block-start: var(--nav-offset);
}

.bg-pristine-white {
	background-color: var(--white);
}

.bg-simple-gray {
	background-color: var(--gray-100);
	border-block: 1px solid var(--gray-200);

	& + & {
		border-block-start: none;
	}
}

.bg-easy-gray {
	background: linear-gradient(180deg, var(--white), var(--gray-50) 100%);
	border-block-end: 1px solid var(--gray-200);
}

.bg-pristine-white-lines {
	position: relative;
}

.bg-dark-night {
	background-color: var(--gray-900);

	--black: var(--white);

	:deep(.base-button.color-secondary.outline) {
		--background-color: color-mix(in srgb, transparent, var(--white) 10%);
		--border-color: var(--gray-600);
		--background-color-hover: color-mix(in srgb, transparent, var(--white) 10%);
		--border-color-hover: var(--gray-400);
	}
}

.bg-colorful {
	background: url('~/assets/svg/gradient.svg');
	background-size: cover;
}
</style>
