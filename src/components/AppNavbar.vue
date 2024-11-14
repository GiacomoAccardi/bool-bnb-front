<script>
export default {};
</script>
<template>
	<div class="container">
		<div class="row navbarcustom sticky">
			<div class="col-2">
				<h1 class="logo-config rainbow3">Bool-b&b</h1>
			</div>
			<div class="col-10">
				<div class="content float-end">
					<ul class="list-unstyled mt-3 d-flex justify-content-end">
						<li class="mx-3">
							<a href="#Home" class="text-secondary text-decoration-none"
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
