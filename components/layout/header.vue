<template>
	<div class="header">
		<div class="text">
			Jules Janssen was actually wondering why we always talk in third-person on
			the web. As if Jules Janssen is a brand. Yuk! But if I would be talking in
			the first person, it's still expected of me to introduce myself. “My name
			is Jules Janssen, and I am a designer.” Cogito ergo sum type-o-way! Plus,
			I wouldn't be able to put my name first in the sentence, which is kind of
			problematic in terms of UX. So messy! So let's keep it practical: Jules
			Janssen (1995) is a graphic designer who is currently based in Amsterdam,
			The Netherlands. Specialized in visual identities, aesthetic ministrations
			and printed matter. Strongly believes in mistakes and likes to assume that
			swimming against the current while making grand gestures of subjectivity
			can help the community. For commissions, collaborations and chats:
			<a href="tel:+31(0)639277146">+31(0)639277146</a>,
			<a href="mailto:info@julesjanssen.biz">info@julesjanssen.biz</a>,
			<a
				href="https://instagram.com/
julescrepuul"
				>Instagram</a
			>.
		</div>
		<slot></slot>
	</div>
</template>

<script setup></script>

<style lang="postcss" scoped>
	.text {
		position: fixed;
		top: 0;
		padding: var(--space-m);
		z-index: -2;
	}
</style>
