<script>
export default {};
</script>
<template>
	<div class="containers sticky-top">
		<div class="row navbarcustom">
			<div class="col-3">
				<a href="/" class="text-decoration-none">
					<h1 class="logo-config rainbow3">Bool-b&b</h1>
					<h1 class="logo-config rainbow4">BB</h1>
				</a>
			</div>
			<div class="col-9">
				<div class="content float-end">
					<ul class="list-unstyled mt-3 d-flex justify-content-end">
						<li class="mx-3">
							<a href="/" class="text-secondary text-decoration-none">Home</a>
						</li>
						<li class="mx-3">
							<a
								href="http://127.0.0.1:8000/"
								class="text-secondary text-decoration-none"
								target="_blank"
								>Affitta con Bool b&b</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.navbarcustom {
	z-index: 1000;
}

li {
	cursor: pointer;
	position: relative;

	& a {
		text-decoration: none;
		color: inherit;
		position: relative;
		display: inline-block;
	}

	&:hover a {
		color: blue;
	}

	&:hover::after {
		width: 110%;
	}

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0%;
		height: 2px;
		background-color: blue;
		transition: width 0.3s ease-in-out;
	}
}

.rainbow3 {
	background: linear-gradient(
		114deg,
		rgba(2, 0, 36, 1) 21%,
		rgba(1, 0, 255, 1) 45%
	);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	@media screen and (max-width: 768px) {
		display: none;
	}
}
.rainbow4 {
	background: linear-gradient(
		114deg,
		rgba(2, 0, 36, 1) 21%,
		rgba(1, 0, 255, 1) 45%
	);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	@media screen and (min-width: 768px) {
		display: none;
	}
}
</style>
