<script>
     import { enhance } from '$app/forms';
    export let data;
    $: story=''
    let loading=false
  
</script>
<div>
<form method="POST" action="?/ask" class='flex flex-col gap-10 justify-center items-center' on:submit={()=>{loading=true}} use:enhance={({ formElement, formData, action, cancel }) => {
   
    return async ({ result }) => {
        
        loading = false;
        story=result.data.story
    };
}}>
    <div class='w-full flex gap-10 justify-center'>
    <div>
        <label for='celebrity'>
            Pick a person
        </label>
        <select name="celebrity" id="celebrity">
            {#each data.celebrity as celebrity}
            <option value={celebrity}>{celebrity}</option>
          {/each}
          </select>
    </div>
    <div>
        <label for='genre'>
            Pick a genre
        </label>
        <select name="genre" id="genre">
            {#each data.genre as genre}
            <option value={genre}>{genre}</option>
          {/each}
          </select>
    </div>
</div>
    <div>
        <label for='setting'>
            Pick a Setting
        </label>
        <select name="setting" id="setting">
            {#each data.setting as setting}
            <option value={setting}>{setting}</option>
          {/each}
          </select>
    </div>

   
<button type='submit' class='bg-black text-white px-5 py-3 max-w-48 self-center rounded-md'> Generate</button>
</form>
<div class='border border-black h-fit w-full mt-4 p-4 flex justify-center rounded-md'>
    {#if loading}
    <iconify-icon icon="eos-icons:loading" width="24" height="24" style="color: #000"></iconify-icon>
    {:else}
    <p>{story}</p>
    {/if}

</div>
</div>