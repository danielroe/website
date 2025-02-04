<script setup lang="ts">
import type { BlockProps } from './types';

const { $directus, $readItem } = useNuxtApp();

const props = defineProps<BlockProps>();

const { data: block } = useAsyncData(props.uuid, () =>
	$directus.request(
		$readItem('block_resource_slider', props.uuid, {
			fields: [
				{
					resources: [
						{
							resources_id: [
								'id',
								'title',
								'date_published',
								'slug',
								{ author: ['name', 'job_title', 'image'], image: ['id', 'description'], type: ['slug'] },
							],
						},
					],
				},
			],
		})
	)
);

const {
	active: activeSlide,
	progress,
	loop,
	stop,
} = useSlider({ duration: 10000, length: unref(block)?.resources?.length ?? 0 });

loop();
</script>

<template>
	<article v-if="block" class="block-resource-slider" @pointerenter="stop" @pointerleave="loop">
		<NuxtLink
			v-for="({ resources_id: resource }, index) in block.resources"
			v-show="activeSlide === index"
			:key="resource.id"
			:href="`/${resource.type.slug}/${resource.slug}`"
		>
			<article class="two-up">
				<BaseMedia class="image">
					<BaseDirectusImage :uuid="resource.image.id" :alt="resource.image.description ?? ''" />
				</BaseMedia>

				<div>
					<h2>{{ resource.title }}</h2>

					<BaseByline
						v-if="resource.author"
						class="byline"
						:name="resource.author.name"
						:title="resource.author.job_title ?? undefined"
						:image="resource.author.image ?? undefined"
					/>
				</div>
			</article>
		</NuxtLink>

		<div class="controls">
			<BaseCircularProgress :percentage="progress" />
			<BaseSlideIndicator v-model="activeSlide" :length="block.resources?.length ?? 0" />
		</div>
	</article>
</template>

<style lang="scss" scoped>
.block-resource-slider {
	position: relative;

	a {
		color: var(--black);
		text-decoration: none;
	}

	.two-up {
		--columns: 1;
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		gap: var(--space-8);
		align-items: center;

		@container (width > 40rem) {
			--columns: 2;
		}
	}

	h2 {
		font-family: var(--family-display);
		font-size: var(--font-size-base);
		line-height: var(--line-height-base);
		margin-block-end: var(--space-3);

		@container (width > 25rem) {
			font-size: var(--font-size-lg);
			line-height: var(--line-height-lg);
		}

		@container (width > 35rem) {
			font-size: var(--font-size-2xl);
			line-height: var(--line-height-2xl);
		}

		@container (width > 50rem) {
			font-size: var(--font-size-4xl);
			line-height: var(--line-height-4xl);
		}
	}

	a:hover h2 {
		text-decoration: underline;
	}

	.controls {
		position: absolute;
		inset-block-start: var(--space-5);
		inset-inline-start: var(--space-5);
		display: flex;
		align-items: center;
		gap: var(--space-4);

		* {
			--color: var(--white);
			--track-color: color-mix(in srgb, transparent, var(--white) 50%);
			--hover-color: color-mix(in srgb, transparent, var(--white) 70%);

			flex-shrink: 0;
		}
	}
}
</style>
