import React, {
  DragEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { UserLoggedContext } from "../contexts/UserLoggedContext";

export default function Dashboard() {
  const { userLogged } = useContext(UserLoggedContext);
  const { isAdmin } = userLogged;
  const isTecnico = JSON.parse(sessionStorage.getItem("roles")).includes(
    "ROLE_TECNICO"
  );
  const dropBox = useRef<HTMLDivElement>(null);
  const addShortcutButton = useRef<HTMLButtonElement>(null);
  const removeShortcutButton = useRef<HTMLButtonElement>(null);
  const shortcutsDiv = useRef<HTMLDivElement>(null);
  const entidadesABM = [
    "Personas",
    "Empresas",
    "Clientes",
    "Usuarios",
    "Productos y Servicios",
    "Impuestos",
  ];
  const svgDatabase = (
    <svg
      className="w-5 h-5 text-electric-violet lg:w-6 lg:h-6 dark:text-primary-300"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 20"
    >
      <path d="M8 5.625c4.418 0 8-1.063 8-2.375S12.418.875 8 .875 0 1.938 0 3.25s3.582 2.375 8 2.375Zm0 13.5c4.963 0 8-1.538 8-2.375v-4.019c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353c-.193.081-.394.158-.6.231l-.189.067c-2.04.628-4.165.936-6.3.911a20.601 20.601 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244c-.053-.028-.113-.053-.165-.082v4.019C0 17.587 3.037 19.125 8 19.125Zm7.09-12.709c-.193.081-.394.158-.6.231l-.189.067a20.6 20.6 0 0 1-6.3.911 20.6 20.6 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244C.112 6.035.052 6.01 0 5.981V10c0 .837 3.037 2.375 8 2.375s8-1.538 8-2.375V5.981c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353Z" />
    </svg>
  );
  const [shortcuts, setShortcuts] = useState<string[]>([]);
  let draggedItem: EventTarget | null = null;

  useEffect(() => {
    if (shortcuts.length === 0) {
      shortcutsDiv.current?.classList.add("d-none");
    } else {
      if (shortcutsDiv.current?.classList.contains("d-none")) {
        shortcutsDiv.current?.classList.remove("d-none");
        shortcutsDiv.current?.classList.add("flex");
      }
    }
  }, [shortcuts]);

  function handleOnDragEvent(e: React.DragEvent<HTMLLIElement>) {
    draggedItem = e.currentTarget;
    const entidad = (draggedItem as HTMLElement).getAttribute("data-entidad");
    if (shortcutsDiv.current?.classList.contains("flex")) {
      shortcutsDiv.current?.classList.remove("d-none");
    }
    if (entidad && !shortcuts.includes(entidad)) {
      addShortcutButton.current?.classList.add("flex");
      addShortcutButton.current?.classList.remove("d-none");
    } else {
      removeShortcutButton.current?.classList.add("flex");
      removeShortcutButton.current?.classList.remove("d-none");
    }
  }

  function handleOnDragEndEvent(e: React.DragEvent<HTMLLIElement>) {
    draggedItem = null;
    addShortcutButton.current?.classList.add("d-none");
    removeShortcutButton.current?.classList.add("d-none");
  }

  function handleOnDropEvent(e: React.DragEvent<HTMLButtonElement>) {
    if (draggedItem) {
      const entidad = (draggedItem as HTMLElement).getAttribute("data-entidad");

      if (entidad && !shortcuts.includes(entidad) && dropBox.current) {
        setShortcuts([...shortcuts, entidad]);

        // Clone the dragged item
        const clonedItem = (draggedItem as HTMLElement).cloneNode(
          true
        ) as HTMLElement;

        // Hide the text of the cloned item
        const spanElement = clonedItem.querySelector("span");
        if (spanElement) {
          spanElement.style.display = "none";
        }

        // Adjust the size and styles of the cloned item
        const linkElement = clonedItem.querySelector("a");
        if (linkElement) {
          linkElement.style.justifyContent = "center"; // Centers the SVG horizontally
          linkElement.style.width = "auto";
        }
        clonedItem.style.width = "fit-content";
        dropBox.current.appendChild(clonedItem);
      }
    }
  }

  function renderIcon(index: number, params: Object) {
    switch (index) {
      case 1:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            zoomAndPan="magnify"
            viewBox="0 0 30 30.000001"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            color="currentOne"
            {...params}
          >
            <defs>
              <g>
                <g id="id1" />
              </g>
            </defs>
            <g fill="rgb(0%, 0%, 0%)" fillOpacity="1">
              <g transform="translate(10.276832, 24.739462)">
                <g>
                  <path d="M 2.96875 -16.640625 C 2.6875 -16.285156 2.285156 -16 1.765625 -15.78125 C 1.253906 -15.570312 0.765625 -15.46875 0.296875 -15.46875 L 0.296875 -18.90625 C 1.035156 -19.019531 1.769531 -19.3125 2.5 -19.78125 C 3.226562 -20.25 3.753906 -20.863281 4.078125 -21.625 L 7.546875 -21.625 L 7.546875 0 L 2.96875 0 Z M 2.96875 -16.640625 " />
                </g>
              </g>
            </g>
          </svg>
        );
        break;
      case 2:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            zoomAndPan="magnify"
            viewBox="0 0 30 30.000001"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            {...params}
          >
            <defs>
              <g>
                <g id="id1" />
              </g>
            </defs>
            <g fill="rgb(0%, 0%, 0%)" fillOpacity="1">
              <g transform="translate(8.236804, 24.739459)">
                <g>
                  <path d="M 0.75 -1.03125 C 0.75 -2.019531 0.90625 -2.929688 1.21875 -3.765625 C 1.53125 -4.609375 1.910156 -5.363281 2.359375 -6.03125 C 2.816406 -6.707031 3.410156 -7.492188 4.140625 -8.390625 C 4.898438 -9.335938 5.5 -10.132812 5.9375 -10.78125 C 6.382812 -11.4375 6.765625 -12.1875 7.078125 -13.03125 C 7.390625 -13.882812 7.546875 -14.800781 7.546875 -15.78125 C 7.546875 -16.375 7.460938 -16.832031 7.296875 -17.15625 C 7.128906 -17.488281 6.828125 -17.65625 6.390625 -17.65625 C 5.660156 -17.65625 5.296875 -17.007812 5.296875 -15.71875 L 5.296875 -13.078125 L 0.75 -13.078125 L 0.703125 -14.40625 C 0.703125 -16.050781 0.867188 -17.398438 1.203125 -18.453125 C 1.535156 -19.503906 2.117188 -20.304688 2.953125 -20.859375 C 3.796875 -21.421875 4.957031 -21.703125 6.4375 -21.703125 C 8.25 -21.703125 9.648438 -21.191406 10.640625 -20.171875 C 11.628906 -19.160156 12.125 -17.722656 12.125 -15.859375 C 12.125 -14.671875 11.957031 -13.59375 11.625 -12.625 C 11.300781 -11.664062 10.898438 -10.828125 10.421875 -10.109375 C 9.941406 -9.390625 9.304688 -8.539062 8.515625 -7.5625 C 7.953125 -6.875 7.476562 -6.257812 7.09375 -5.71875 C 6.71875 -5.1875 6.378906 -4.640625 6.078125 -4.078125 L 11.96875 -4.078125 L 11.96875 0 L 0.75 0 Z M 0.75 -1.03125 " />
                </g>
              </g>
            </g>
          </svg>
        );
        break;
      case 3:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            zoomAndPan="magnify"
            viewBox="0 0 30 30.000001"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            {...params}
          >
            <defs>
              <g>
                <g id="id1" />
              </g>
            </defs>
            <g fill="rgb(0%, 0%, 0%)" fillOpacity="1">
              <g transform="translate(8.236804, 24.739466)">
                <g>
                  <path d="M 5.9375 0.25 C 4.039062 0.25 2.65625 -0.242188 1.78125 -1.234375 C 0.914062 -2.234375 0.484375 -3.757812 0.484375 -5.8125 L 0.484375 -8.0625 L 4.90625 -8.0625 L 4.90625 -5.8125 C 4.90625 -5.15625 4.988281 -4.644531 5.15625 -4.28125 C 5.320312 -3.925781 5.65625 -3.75 6.15625 -3.75 C 6.507812 -3.75 6.765625 -3.875 6.921875 -4.125 C 7.085938 -4.375 7.1875 -4.671875 7.21875 -5.015625 C 7.25 -5.359375 7.265625 -5.859375 7.265625 -6.515625 L 7.265625 -7.046875 C 7.265625 -8.898438 6.65625 -9.828125 5.4375 -9.828125 C 5.21875 -9.828125 5.070312 -9.820312 5 -9.8125 L 5 -13.671875 C 5.769531 -13.671875 6.347656 -13.84375 6.734375 -14.1875 C 7.117188 -14.53125 7.3125 -15.082031 7.3125 -15.84375 C 7.3125 -17.0625 6.960938 -17.671875 6.265625 -17.671875 C 5.828125 -17.671875 5.546875 -17.5625 5.421875 -17.34375 C 5.296875 -17.125 5.210938 -16.847656 5.171875 -16.515625 C 5.128906 -16.179688 5.097656 -15.9375 5.078125 -15.78125 L 5.078125 -15.140625 L 0.609375 -15.140625 L 0.578125 -15.890625 C 0.597656 -17.867188 1.066406 -19.320312 1.984375 -20.25 C 2.910156 -21.175781 4.328125 -21.640625 6.234375 -21.640625 C 9.898438 -21.640625 11.734375 -19.722656 11.734375 -15.890625 C 11.734375 -14.765625 11.582031 -13.867188 11.28125 -13.203125 C 10.976562 -12.546875 10.460938 -12.082031 9.734375 -11.8125 C 10.335938 -11.507812 10.785156 -11.132812 11.078125 -10.6875 C 11.367188 -10.25 11.5625 -9.710938 11.65625 -9.078125 C 11.75 -8.441406 11.796875 -7.585938 11.796875 -6.515625 C 11.796875 -4.285156 11.328125 -2.597656 10.390625 -1.453125 C 9.460938 -0.316406 7.976562 0.25 5.9375 0.25 Z M 5.9375 0.25 " />
                </g>
              </g>
            </g>
          </svg>
        );
        break;
      case 4:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            zoomAndPan="magnify"
            viewBox="0 0 30 30.000001"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            {...params}
          >
            <defs>
              <g>
                <g id="id1" />
              </g>
            </defs>
            <g fill="rgb(0%, 0%, 0%)" fillOpacity="1">
              <g transform="translate(8.236804, 24.739473)">
                <g>
                  <path d="M 6.640625 0 L 6.640625 -3.421875 L 0.21875 -3.421875 L 0.21875 -6.78125 L 4.296875 -21.625 L 11.03125 -21.625 L 11.03125 -7.015625 L 12.1875 -7.015625 L 12.1875 -3.421875 L 11.03125 -3.421875 L 11.03125 0 Z M 4.078125 -7.015625 L 6.640625 -7.015625 L 6.640625 -17.90625 Z M 4.078125 -7.015625 " />
                </g>
              </g>
            </g>
          </svg>
        );
        break;
      case 5:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            zoomAndPan="magnify"
            viewBox="0 0 30 30.000001"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            {...params}
          >
            <defs>
              <g>
                <g id="id1" />
              </g>
            </defs>
            <g fill="rgb(0%, 0%, 0%)" fillOpacity="1">
              <g transform="translate(8.236804, 24.739466)">
                <g>
                  <path d="M 6.203125 0.296875 C 4.484375 0.296875 3.109375 -0.125 2.078125 -0.96875 C 1.054688 -1.8125 0.546875 -3.0625 0.546875 -4.71875 L 0.546875 -7.921875 L 5.046875 -7.921875 L 5.046875 -6.078125 C 5.046875 -5.347656 5.117188 -4.769531 5.265625 -4.34375 C 5.421875 -3.925781 5.734375 -3.71875 6.203125 -3.71875 C 6.640625 -3.71875 6.9375 -3.859375 7.09375 -4.140625 C 7.257812 -4.429688 7.34375 -4.851562 7.34375 -5.40625 L 7.34375 -9.65625 C 7.34375 -10.34375 7.269531 -10.890625 7.125 -11.296875 C 6.976562 -11.710938 6.679688 -11.921875 6.234375 -11.921875 C 5.410156 -11.921875 5 -11.320312 5 -10.125 L 1.0625 -10.125 L 1.0625 -21.625 L 11.34375 -21.625 L 11.34375 -17.578125 L 5.15625 -17.578125 L 5.15625 -14.53125 C 5.375 -14.8125 5.664062 -15.046875 6.03125 -15.234375 C 6.40625 -15.421875 6.828125 -15.515625 7.296875 -15.515625 C 9.097656 -15.515625 10.328125 -14.875 10.984375 -13.59375 C 11.648438 -12.320312 11.984375 -10.523438 11.984375 -8.203125 C 11.984375 -6.265625 11.84375 -4.695312 11.5625 -3.5 C 11.289062 -2.300781 10.734375 -1.367188 9.890625 -0.703125 C 9.054688 -0.0351562 7.828125 0.296875 6.203125 0.296875 Z M 6.203125 0.296875 " />
                </g>
              </g>
            </g>
          </svg>
        );
        break;
      case 6:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            zoomAndPan="magnify"
            viewBox="0 0 30 30.000001"
            height="30"
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            {...params}
          >
            <defs>
              <g>
                <g id="id1" />
              </g>
            </defs>
            <g fill="rgb(0%, 0%, 0%)" fillOpacity="1">
              <g transform="translate(8.236804, 24.739466)">
                <g>
                  <path d="M 6.484375 0.203125 C 5.015625 0.203125 3.847656 -0.046875 2.984375 -0.546875 C 2.128906 -1.054688 1.523438 -1.8125 1.171875 -2.8125 C 0.828125 -3.820312 0.65625 -5.128906 0.65625 -6.734375 L 0.65625 -12.5625 C 0.65625 -14.789062 0.789062 -16.546875 1.0625 -17.828125 C 1.34375 -19.117188 1.910156 -20.101562 2.765625 -20.78125 C 3.617188 -21.457031 4.898438 -21.796875 6.609375 -21.796875 C 7.546875 -21.796875 8.410156 -21.632812 9.203125 -21.3125 C 9.992188 -21 10.625 -20.523438 11.09375 -19.890625 C 11.5625 -19.253906 11.796875 -18.484375 11.796875 -17.578125 L 11.796875 -15.234375 L 7.625 -15.234375 L 7.625 -15.6875 C 7.625 -16.425781 7.554688 -16.992188 7.421875 -17.390625 C 7.296875 -17.796875 7 -18 6.53125 -18 C 6.0625 -18 5.726562 -17.875 5.53125 -17.625 C 5.34375 -17.375 5.25 -16.988281 5.25 -16.46875 L 5.25 -12.125 C 5.457031 -12.519531 5.769531 -12.832031 6.1875 -13.0625 C 6.601562 -13.289062 7.097656 -13.40625 7.671875 -13.40625 C 8.835938 -13.40625 9.742188 -13.164062 10.390625 -12.6875 C 11.035156 -12.21875 11.484375 -11.523438 11.734375 -10.609375 C 11.992188 -9.691406 12.125 -8.484375 12.125 -6.984375 C 12.125 -4.691406 11.6875 -2.921875 10.8125 -1.671875 C 9.9375 -0.421875 8.492188 0.203125 6.484375 0.203125 Z M 6.328125 -3.765625 C 6.785156 -3.765625 7.078125 -3.945312 7.203125 -4.3125 C 7.328125 -4.675781 7.390625 -5.265625 7.390625 -6.078125 L 7.390625 -7.8125 C 7.390625 -8.988281 7.054688 -9.578125 6.390625 -9.578125 C 5.628906 -9.578125 5.25 -9.066406 5.25 -8.046875 L 5.25 -5.375 C 5.25 -4.300781 5.609375 -3.765625 6.328125 -3.765625 Z M 6.328125 -3.765625 " />
                </g>
              </g>
            </g>
          </svg>
        );
        break;
    }
  }

  return (
    <section className="bg-athens-gray dark:bg-gray-900">
      <button
        style={{
          position: "absolute",
          left: "50%",
          bottom: "15%",
          transform: "translate(-50%, -50%)",
          height: "auto",
          width: "auto",
          borderRadius: "50%",
          backgroundColor: "rgb(161 161 170)",
          zIndex: "2",
        }}
        ref={removeShortcutButton}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          handleOnDropEvent(e);
        }}
        className="d-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          fill="currentColor"
          className="bi bi-trash-fill"
          viewBox="0 0 16 16"
          style={{ padding: "7.5px", transform: "translateY(5%)" }}
        >
          {" "}
          <path
            fill="#C53030"
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
          />{" "}
        </svg>
      </button>
      <button
        style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "auto",
          width: "auto",
          borderRadius: "50%",
          backgroundColor: "rgb(161 161 170)",
          zIndex: "2",
        }}
        ref={addShortcutButton}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          handleOnDropEvent(e);
        }}
        className="d-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          fill="none" // Ensure the SVG itself doesn't have a fill
          className="bi bi-heart-fill"
          viewBox="0 0 16 16"
          style={{ padding: "7.5px", transform: "translateY(5%)" }}
        >
          <path
            fillRule="evenodd"
            fill="#C53030" // This is the color for bg-red-800 in default Tailwind CSS config
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      </button>
      <div className="pb-8 mx-auto max-w-screen-xl sm:pb-16 lg:pb-6">
        <div className="max-w-screen-md mb-8 lg:mb-16 mx-auto">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Diseñado para equipos empresariales
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            En Crisalis nos centramos en mercados en los que la tecnología, la
            innovación y el capital pueden generar valor a largo plazo e
            impulsar el crecimiento económico.
          </p>
        </div>
        <div
          className="flex flex-column justify-content-center align-items-center my-3 d-none"
          ref={shortcutsDiv}
        >
          <div className="flex flex-row justify-content-center align-items-center">
            <div className="flex justify-center items-center w-10 h-10 rounded-md bg-yellow-200 lg:h-12 lg:w-12 dark:bg-primary-900 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-5 h-5 text-amber-400 lg:w-6 lg:h-6 dark:text-primary-300"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />{" "}
              </svg>
            </div>
            <h5 className="text-xl font-bold dark:text-white text-start">
              Acceso Rapido
            </h5>
          </div>
          <div
            className="grid grid-cols-6 gap-y-2 spaceVerticalChilds spaceHorizontalChilds rounded-md border-dashed border-yellow-400 border-2 mt-2 shortcutsDiv"
            style={{ minHeight: "10vh", width: "85%" }}
            ref={dropBox}
          ></div>
        </div>
        <div
          className={`space-y-8 md:grid md:grid-cols-2 ${
            isTecnico ? "lg:grid-cols-1 place-items-center" : "lg:grid-cols-3"
          } md:gap-12 md:space-y-0`}
        >
          <>
            {!isTecnico && (
              <>
                <div>
                  <div className="flex justify-center items-center w-10 h-10 rounded-md bg-electric-violet-50 lg:h-12 lg:w-12 dark:bg-primary-900">
                    {svgDatabase}
                  </div>
                  <h3 className="my-3 text-xl font-bold dark:text-white text-start">
                    Alta, Baja y Modificación
                  </h3>

                  <ul className="text-gray-500 dark:text-gray-400 space-y-3">
                    {entidadesABM.map((entidad, index) => {
                      if (
                        (entidad !== "Usuarios" &&
                          entidad !== "Productos y Servicios" &&
                          entidad !== "Impuestos") ||
                        (entidad === "Usuarios" && isAdmin) ||
                        (entidad === "Productos y Servicios" && isAdmin) ||
                        (entidad === "Impuestos" && isAdmin)
                      ) {
                        return (
                          <li
                            key={entidad}
                            data-entidad={entidad}
                            className="flex hover:bg-slate-50 rounded-md shadow-md bg-white-pure draggable-element"
                            onDrag={(e) => {
                              handleOnDragEvent(e);
                            }}
                            onDragEnd={(e) => {
                              handleOnDragEndEvent(e);
                            }}
                            draggable={true}
                          >
                            <Link
                              to={`/${entidad
                                .toLowerCase()
                                .replace(/\s+/g, "")}`}
                              className="flex p-3 w-full justify-between"
                            >
                              <span>{`ABM de ${entidad}`}</span>
                              {/* {renderIcon(index + 1, {
                            className:
                              "w-4 h-4 text-electric-violet dark:text-white self-center svgIconColored",
                            fill: "currentColor",
                            "aria-hidden": "true",
                          })} */}
                              <svg
                                className="w-4 h-4 text-electric-violet dark:text-white self-center"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 14 16"
                              >
                                <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                              </svg>
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>

                <div>
                  <div className="flex justify-center items-center w-10 h-10 rounded-md bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                    <svg
                      className="w-5 h-5 text-denim lg:w-6 lg:h-6 dark:text-primary-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                    </svg>
                  </div>
                  <h3 className="my-3 text-xl font-bold dark:text-white text-start">
                    Pedidos
                  </h3>

                  <ul className="text-gray-500 dark:text-gray-400 space-y-3">
                    <li
                      key="Listado y anulación de pedidos"
                      className="flex hover:bg-slate-100 rounded-md bg-white-pure shadow-md"
                    >
                      <Link
                        to={`/pedidos`}
                        className="flex p-3 w-full justify-between"
                      >
                        <span>Listado y anulación de Pedidos</span>
                        <svg
                          className="w-4 h-4 text-denim dark:text-white self-center"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 14 16"
                        >
                          <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                        </svg>
                      </Link>
                    </li>
                    <li
                      key="Alta de pedido"
                      className="flex hover:bg-slate-100 rounded-md bg-white-pure shadow-md"
                    >
                      <Link
                        to={`/altaPedido`}
                        className="flex p-3 w-full justify-between"
                      >
                        <span>Alta de Pedido</span>
                        <svg
                          className="w-4 h-4 text-denim dark:text-white self-center"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 14 16"
                        >
                          <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}

            <div className={`${isTecnico ? "w-80" : ""}`}>
              <div className="flex justify-center items-center w-10 h-10 rounded-md bg-atlantis-50 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-5 h-5 text-atlantis lg:w-6 lg:h-6 dark:text-primary-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="my-3 text-xl font-bold dark:text-white text-start">
                Servicios
              </h3>
              <ul className="text-gray-500 dark:text-gray-400 space-y-3">
                <li className="flex hover:bg-slate-100 rounded-md bg-white-pure shadow-md">
                  <Link
                    to={`/suscripciones`}
                    className="flex p-3 w-full justify-between"
                  >
                    <span>{`Asignar Servicios a Cliente`}</span>
                    <svg
                      className="w-4 h-4 text-atlantis dark:text-white self-center"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 14 16"
                    >
                      <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </>
        </div>
      </div>
    </section>
  );
}
