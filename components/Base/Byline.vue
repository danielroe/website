<script setup lang="ts">
interface BaseBylineProps {
	name?: string;
	title?: string;
	image?: string;
}

defineProps<BaseBylineProps>();
</script>

<template>
	<address rel="author" class="base-byline">
		<BaseDirectusImage v-if="image" width="44" height="44" class="avatar" :uuid="image" :alt="name ?? ''" />

		<div>
			<p v-if="name" class="name">{{ name }}</p>
			<p v-if="title" class="title">{{ title }}</p>
		</div>
	</address>
</template>

<style scoped lang="scss">
.base-byline {
	--color: var(--black);
	--title-color: var(--gray-400);
	--text-shadow: none;

	color: var(--color);
	display: flex;
	gap: var(--space-2);
	font-style: normal;
	align-items: center;

	.avatar {
		border-radius: var(--rounded-full);
		inline-size: var(--space-11);
		block-size: var(--space-11);
		object-fit: cover;
	}

	div {
		text-shadow: var(--text-shadow);
	}

	.title {
		color: var(--title-color);
		font-size: var(--font-size-sm);
		line-height: var(--line-height-sm);
	}
}
</style>
