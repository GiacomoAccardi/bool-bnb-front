<template>
	<router-link
		:to="{
			name: 'realEstateDetail',
			params: { id: realEstate.id },
		}"
		class="btn border-0">
		<div
			class="card"
			:class="{ 'border-wow': realEstate.subscriptions.length > 0 }">
			<!-- Verifica se subscriptions contiene almeno un elemento -->
			<div class="row">
				<div class="col-12">
					<div class="adv-badge" v-if="realEstate.subscriptions.length > 0">
						<p class="m-0">Sponsorizzato</p>
					</div>
					<img
						:src="
							'http://127.0.0.1:8000/storage/' +
							realEstate.portrait +
							'?v=' +
							new Date().getTime()
						"
						class="card-img"
						alt="Immobile" />
				</div>

				<div class="col-12">
					<div class="card-body">
						<h5 class="card-title">{{ realEstate.title }}</h5>
						<p class="m-1">
							{{ realEstate.city }}
						</p>
						<p class="m-1">€ {{ realEstate.price }}</p>
					</div>
				</div>
			</div>
		</div>
	</router-link>
</template>

<script>
export default {
	props: {
		realEstate: {
			type: Object,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.card {
	max-height: 100%;
	position: relative;
	border: none !important;
	transition: all 0.3s ease-in-out;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

	&:hover {
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.515);
		transform: scale(1.025);
	}

	.card-title {
		overflow: hidden;
		padding: 0 5px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.adv-badge {
		position: absolute;
		top: 10px;
		right: 10px;
		background: linear-gradient(
			114deg,
			rgb(38, 38, 159) 4%,
			rgba(128, 234, 255, 1) 92%
		);
		color: white;
		padding: 10px;
	}
}
.card-img {
	width: 100%;
	aspect-ratio: 1/1;
	overflow: hidden;
	object-fit: cover;
	border-radius: 5px 5px 0 0;
}

.card-body {
	padding: 5%;
}

.border-wow {
	border: 4px solid transparent !important;
	border-image: linear-gradient(
			114deg,
			rgb(38, 38, 159) 4%,
			rgba(128, 234, 255, 1) 92%
		)
		1 !important;
	border-radius: 10px !important;
}

.real-estate-card h3 {
	margin: 0;
	font-size: 1.5rem;
}
.real-estate-card p {
	margin: 8px 0;
}
button {
	padding: 8px 16px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}
button:hover {
	background-color: #0056b3;
}
</style>
