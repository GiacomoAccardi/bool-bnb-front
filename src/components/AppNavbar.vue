<script>
export default {};
</script>
<template>
	<div class="containers sticky-top">
		<div class="row navbarcustom">
			<div class="col-2">
				<a href="/" class="text-decoration-none">
					<h1 class="logo-config rainbow3">Bool-b&b</h1>
				</a>
			</div>
			<div class="col-10">
				<div class="content float-end">
					<ul class="list-unstyled mt-3 d-flex justify-content-end">
						<li class="mx-3 border-wow">
							<a href="/" class="text-secondary text-decoration-none">Home</a>
						</li>
						<li class="mx-3 border-wow">
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

.border-wow {
	padding: 5px;
	margin: 5px;
	transition: all 0.3s ease-in-out;
	&:hover {
		border: 4px solid transparent;
		border-image: linear-gradient(
				114deg,
				rgb(38, 38, 159) 4%,
				rgba(128, 234, 255, 1) 92%
			)
			1;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.415);
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
}
</style>
