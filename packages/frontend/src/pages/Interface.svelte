<script lang="ts">
    import SidePanel from "../components/SidePanel.svelte";
</script>

<div class="wrapper">
    <SidePanel />
</div>

<style lang="scss">
    .wrapper {
        position: absolute;
        height: 100%;
        bottom: 0;
        width: 100%;
        display: flex;
    }
</style>