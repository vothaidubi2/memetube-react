import React from "react"; 

function SidebarRow({ selected,Icon,title }) {
    return (
        <div className={`item-sidebar ${selected && "selected"}`}>
            <Icon />
            <h2 className="sidebar-content">{title}</h2>
        </div>
    )
}

export default SidebarRow;