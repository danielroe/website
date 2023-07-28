<script setup lang="ts">
import type { CompProps } from './types';

const { $directus, $readItem } = useNuxtApp();

const props = defineProps<CompProps>();

const { data: comp } = useAsyncData(props.uuid, () =>
	$directus.request(
		$readItem('comp_code_snippets', props.uuid, {
			fields: ['items'],
		})
	)
);
</script>

<template>
	<div class="code-snippets"></div>
</template>
