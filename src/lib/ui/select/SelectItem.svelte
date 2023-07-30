<script>
	export let item = undefined;
</script>

<div class="select-item {item.class}">
    { item.label }
</div>

<style>
    .select-item{
        font-family: "Minecraftia";
        outline: none;
        height: 54px;
        font-size: 10pt;
    }
    .bg-white {
        background-color: white;
        color: black;
    }

    .bg-black {
        background-color: black;
        color: white;
    }

    .bg-dark_blue {
        background-color: rgb(0, 0, 170);
        color: white;
    }

    .bg-dark_green {
        background-color: rgb(0, 170, 0);
        color: white;
    }

    .bg-dark_aqua {
        background-color: rgb(0, 170, 170);
        color: white;
    }

    .bg-dark_purple {
        background-color: rgb(170, 0, 170);
        color: white;
    }

    .bg-gold {
        background-color: rgb(255, 170, 0);
        color: black;
    }

    .bg-gray {
        background-color: rgb(170, 170, 170);
        color: black;
    }

    .bg-dark_gray {
        background-color: rgb(85, 85, 85);
        color: white;
    }

    .bg-blue {
        background-color: rgb(85, 85, 255);
        color: black;
    }

    .bg-green {
        background-color: rgb(85, 255, 85);
        color: black;
    }

    .bg-aqua {
        background-color: rgb(85, 255, 255);
        color: black;
    }

    .bg-red {
        background-color: rgb(255, 85, 85);
        color: white;
    }

    .bg-dark_red {
        background-color: rgb(170, 0, 0);
        color: white;
    }

    .bg-light_purple {
        background-color: rgb(255, 85, 255);
        color: black;
    }

    .bg-yellow {
        background-color: rgb(255, 255, 85);
        color: black;
    }
</style>
