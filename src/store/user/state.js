export default function () {
  return {
    id: localStorage.getItem('userId') || null,
    name: localStorage.getItem('userName') || null
  }
}