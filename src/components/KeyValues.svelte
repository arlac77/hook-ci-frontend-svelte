<script>
  export let object;
</script>

{#if object}
  <table>
    {#each Object.keys(object) as key}
      <tr>
        <td>{key}</td>
        <td>{object[key]}</td>
      </tr>
    {/each}
  </table>
{/if}
