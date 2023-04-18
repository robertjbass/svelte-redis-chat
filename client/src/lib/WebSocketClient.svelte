<script>
  let ws;
  let messages = [];
  let websocketStatus = "NOT_CONNECTED";
  let username = "Bob Bass";

  const connect = () => {
    ws = new WebSocket("ws://localhost:3000");

    ws.addEventListener("open", (event) => {
      console.log("Connected to WebSocket server:", event);
      websocketStatus = "CONNECTED";
    });

    ws.addEventListener("message", (event) => {
      console.log("Received from server:", event.data);
      messages = [...messages, event.data];
    });

    ws.addEventListener("close", (event) => {
      console.log("Disconnected from WebSocket server:", event);
      websocketStatus = "NOT_CONNECTED";
    });

    ws.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
    });
  };

  let message = "";

  const sendMessage = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    ws.send(JSON.stringify({ username, message }));
    message = "";
  };
</script>

<main class="outer-container flex flex-col mx-auto p-4">
  <div class="mx-auto flex-grow w-full flex">
    {#if !ws || websocketStatus !== "CONNECTED"}
      <div class="p-4 border-2 rounded w-full">
        <div class="w-72 mx-auto">
          <button
            class="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded m-auto w-full"
            on:click={connect}
          >
            Connect
          </button>
        </div>
      </div>
    {:else}
      <ul class="my-4 p-4 border-2 rounded w-full">
        {#each messages as message (message)}
          <li class="mb-2">{message}</li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if websocketStatus === "CONNECTED"}
    <footer class="relative bottom-0 left-0 w-full flex h-10">
      <form class="flex w-full" on:submit|preventDefault={sendMessage}>
        <input
          class="border w-full rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-auto p-2"
          type="text"
          bind:value={message}
          placeholder="Enter your message"
        />
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Send
        </button>
      </form>
    </footer>
  {/if}
</main>

<style>
  main {
    height: calc(100svh);
  }
</style>
