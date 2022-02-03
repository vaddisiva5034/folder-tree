import { useState } from "react";
import "./styles.css";
import { AiFillFile } from "react-icons/ai";
import {
  IoLogoJavascript,
  IoLogoCss3,
  IoLogoHtml5,
  IoLogoNpm,
  IoLogoReact,
  IoFolder,
  IoFolderOpen,
  IoPencil,
  IoClose
} from "react-icons/io5";
const data = {
  name: "root",
  isFolder: true,
  items: [
    {
      name: "public",
      isFolder: true,
      items: [
        {
          name: "index.html",
          isFolder: false
        },
        {
          name: "favicon.png",
          isFolder: false
        }
      ]
    },
    {
      name: "src",
      isFolder: true,
      items: [
        {
          name: "app",
          isFolder: true,
          items: [
            {
              name: "app.jsx",
              isFolder: false
            },
            {
              name: "app.css",
              isFolder: false
            }
          ]
        },
        {
          name: "index.js",
          isFolder: false
        },
        {
          name: "styles.css",
          isFolder: false
        }
      ]
    },
    {
      name: "package.json",
      isFolder: false
    },
    {
      name: "package-lock.json",
      isFolder: false
    }
  ]
};

const GetFileIcon = ({ fileName }) => {
  const fileType = fileName.split(".")[1];
  switch (fileType) {
    case "jsx":
      return <IoLogoReact color="skyblue" />;
    case "js":
      return <IoLogoJavascript color="#acbd19" />;
    case "css":
      return <IoLogoCss3 color="lightblue" />;
    case "html":
      return <IoLogoHtml5 color="#750409" />;
    case "json":
      return <IoLogoNpm />;
    default:
      return <AiFillFile />;
  }
};

const FolderIcon = ({ isOpened }) => {
  return (
    <>
      {isOpened ? (
        <IoFolderOpen color="#117799" />
      ) : (
        <IoFolder color="#117799" />
      )}
    </>
  );
};

const FolderButtons = ({ isFolder }) => {
  return (
    <div className="folder-buttons">
      <IoPencil style={{ marginLeft: "5px" }} />
      {isFolder ? (
        <>
          <IoFolder style={{ marginLeft: "5px" }} />
          <AiFillFile style={{ marginLeft: "5px" }} />
        </>
      ) : null}
      <IoClose style={{ marginLeft: "5px" }} />
    </div>
  );
};

const TitleRender = ({ folderData, handleTitleClick, isOpened }) => {
  const { name, isFolder } = folderData;
  return (
    <div style={{ display: "flex" }} className="title">
      <div onClick={handleTitleClick}>
        {isFolder ? (
          <FolderIcon isOpened={isOpened} />
        ) : (
          <GetFileIcon fileName={name} />
        )}
        <span style={{ marginLeft: "3px" }}>{name}</span>
      </div>
      <div style={{ marginLeft: "10px" }}>
        <FolderButtons isFolder={isFolder} />
      </div>
    </div>
  );
};

const FolderView = ({ folderData }) => {
  const { items } = folderData;
  const [showItems, setShowItems] = useState(false);

  const handleTitleClick = () => {
    setShowItems((prev) => !prev);
  };

  return (
    <div
      className="folderview"
      style={{ marginLeft: "10px", marginTop: "15px", cursor: "pointer" }}
    >
      <TitleRender
        folderData={folderData}
        isOpened={showItems}
        handleTitleClick={handleTitleClick}
      />
      {showItems && items
        ? items.map((item) => (
            <div key={item.name}>
              <FolderView folderData={item} />
            </div>
          ))
        : null}
    </div>
  );
};

export default function App() {
  const [datas, setData] = useState(data);

  const addItem = (name, isFolder, parent) => {};

  return (
    <div className="">
      <FolderView folderData={data} />
    </div>
  );
}
