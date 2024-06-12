<script lang="ts">


const formData = {
  email: '',
  password: "",
}


const handleSubmit = async (e: Event) => {
  
}

</script>

<main>
  <form on:submit={handleSubmit}>
    <input type="text" placeholder="Login" />
    <input type="password" placeholder="Password" />
    <button type="submit">Submit</button>
  </form>
</main>

<style>

</style>
