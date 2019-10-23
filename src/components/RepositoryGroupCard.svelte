<script>
  export let repositoryGroup;
</script>

<div class="item">
  <div class="item-content">
    {repositoryGroup.name}
    {#if repositoryGroup.description}{repositoryGroup.description}{/if}
    {#if repositoryGroup.id}{repositoryGroup.id}{/if}
  </div>
</div>
