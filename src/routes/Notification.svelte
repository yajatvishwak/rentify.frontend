<script>
  import Tobar from "./components/Tobar.svelte";
  import { store } from "../store";
  let username = "";
  let notification = [];
  let items = [];
  store.subscribe((val) => {
    username = JSON.parse(val).username;
  });
  fetch(`http://localhost:3000/item/checkNotification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        console.log(data);
        notification = data.notification;
        items = data.val;
      }
    });

  const getItemName = (id) => {
    let obj = items.find((o) => o.itemID === id);
    return obj.name;
  };
  const acceptRequest = (notID, itemID) => {
    fetch(`http://localhost:3000/item/processAction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notID: notID,
        action: "Accepted",
        username: username,
        itemID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Request Accepted");
        }
      });
  };
  const rejectRequest = (notID) => {
    fetch(`http://localhost:3000/item/processAction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notID: notID,
        action: "Rejected",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Request Rejected");
        }
      });
  };
</script>

<div class="container">
  <Tobar />
  <div class="header">Notifications🔔</div>
  {#each notification as noti}
    {#if noti.from === username}
      <div class="notificationContainer">
        <div class="title">Previous Request</div>
        <div class="subtitle">
          {#if noti.status === null || noti.status === undefined}
            Waiting for {noti.to} to take action on your request for {getItemName(
              noti.itemID
            )}
          {:else if noti.status === "Accepted"}
            🎉 Congratulations! You are presently renting {getItemName(
              noti.itemID
            )}
          {:else if noti.status === "Rejected"}
            😞 Sorry but your request was rejected
          {:else}
            Waiting for {noti.to} to take action on your request for {getItemName(
              noti.itemID
            )}
          {/if}
        </div>
      </div>
    {:else}
      <div class="notificationContainer">
        <div class="title">Request to rent</div>
        <div class="subtitle">{getItemName(noti.itemID)}</div>
        <div class="main">{noti.from} wants to rent your service</div>
        <div class="buttonGroup">
          <div class="chat">Chat with {noti.from}</div>
          <div
            on:click={() => {
              acceptRequest(noti.notID, noti.itemID);
            }}
            class="accept"
          >
            Accept Request
          </div>
          <div
            on:click={() => {
              rejectRequest(noti.notID);
            }}
            class="reject"
          >
            Reject Request
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>

<style>
  .container {
    margin: 1rem;
  }
  .header {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: bold;
  }
  .buttonGroup {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
    justify-content: space-evenly;
  }
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  .subtitle {
    font-size: medium;
  }
  .main {
    margin-top: 1rem;
    font-size: medium;
  }
  .accept {
    margin: 0.5rem;
    padding: 1rem;
    font-weight: bold;
    border-radius: 1rem;
    background-color: #e6d5b8;
  }
  .chat {
    margin: 0.5rem;
    padding: 1rem;
    font-weight: bold;
    border-radius: 1rem;
    background-color: #99a8b2;
  }
  .reject {
    margin: 0.5rem;
    color: white;
    font-weight: bold;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #1f6f8b;
  }

  .notificationContainer {
    background-color: #f1f1f1;
    padding: 1rem;
    border-radius: 1rem;
  }
</style>
