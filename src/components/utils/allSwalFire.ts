import Swal from "sweetalert2";

export function SuccessSwal({ title, text }: { title: string; text: string }) {
  return Swal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonColor: "#DEAD35",
    confirmButtonText: "OK",
  });
}
