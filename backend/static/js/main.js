function deleteAccount(userId) {
  fetch("/delete-account", {
    method: "DELETE",
    body: JSON.stringify({ userId: userId }),
  }).then((_res) => {
    window.location.href = "/";
  });
}
