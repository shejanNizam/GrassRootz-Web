import Swal from "sweetalert2";

export function SuccessSwal({ title, text }: { title: string; text: string }) {
  return Swal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK",
  });
}
