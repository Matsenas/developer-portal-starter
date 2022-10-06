import FeatherIcon from "feather-icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useCallback } from "react";
import { Collapse, Container, Nav, Navbar } from "react-bootstrap";
import data from "./nav";
import dynamic from "next/dynamic";

const Footer = dynamic(
  () =>
    import("../SidebarFooter/SidebarFooter").then(
      (module) => module.SidebarFooter
    ),
  {
    ssr: false,
  }
);

export function Sidenav({ ...props }) {
  const router = useRouter();

  const [activeItemId, setActiveItemId] = useState(() => {
    return Object.keys(data).filter((itemId) => {
      return data[itemId].url === router.pathname;
    })[0];
  });

  function isExpanded(itemId) {
    if (activeItemId === itemId) {
      return true;
    }

    return isParent(itemId);
  }

  function isParent(itemId) {
    const item = data[itemId];

    if (!item || !item.children) {
      return false;
    }

    if (item.children.includes(activeItemId)) {
      return true;
    }

    let result = false;

    item.children.forEach((childId) => {
      if (isParent(childId)) {
        result = true;
      }
    });

    return result;
  }

  function getItems(ids) {
    return ids.map(function (id, index) {
      const item = data[id];

      return (
        <div key={id}>
          {index > 0 && <hr className="navbar-divider" />}
          {item.title && <h6 className="navbar-heading">{item.title}</h6>}
          {item.children && <Nav>{getSubitems(item.children, id, ids)}</Nav>}
        </div>
      );
    });
  }

  function getSubitems(ids, parentId, arr) {
    return ids.map(function (id) {
      const item = data[arr.splice(arr.indexOf(id), 1)];

      return (
        <Nav.Item key={id}>
          {item.children ? (
            <>
              <Nav.Link onClick={() => handleClick(id, parentId)} role="button">
                {item.icon && <FeatherIcon icon={item.icon} size="17" />}
                {item.title}
                <FeatherIcon
                  icon="chevron-down"
                  size="1em"
                  className={`ms-auto nav-chevron ${
                    isExpanded(id) && "active"
                  }`}
                  {...props}
                />
              </Nav.Link>
              <Collapse in={isExpanded(id)}>
                <div>
                  <div className="nav nav-sm flex-column">
                    {getSubitems(item.children, id, arr)}
                  </div>
                </div>
              </Collapse>
            </>
          ) : (
            <ItemLink {...{ item, id, parentId }} />
          )}
        </Nav.Item>
      );
    });
  }

  const ItemLink = ({ item, id, parentId }) => {
    const router = useRouter();

    if (item.title === "Docs") {
      return (
        <Link
          href="https://docs.nftport.xyz/docs/nftport/ZG9jOjE5MzA4MjIy-welcome-to-nft-port-the-stripe-for-nf-ts"
          passHref
        >
          <Nav.Link
            target="_blank"
            active={false}
            onClick={(e) => {
              e.currentTarget.blur();
            }}
          >
            {item.svg}
            {item.title}
          </Nav.Link>
        </Link>
      );
    }

    return (
      <Link href={item.url} passHref>
        <Nav.Link
          active={router.pathname === item.url}
          onClick={() => handleClick(id, parentId)}
        >
          {item.svg}
          {item.title}
        </Nav.Link>
      </Link>
    );
  };

  function handleClick(itemId, parentId, setVisible) {
    setActiveItemId(isExpanded(itemId) ? parentId : itemId);

    if (setVisible) {
      setVisible(false);
    }
  }

  const toggler = <Navbar.Toggle />;

  const brand = (
    <Link href="/" passHref>
      <Navbar.Brand>
        <img className="navbar-brand-img" src="/img/logo.svg" alt="..." />
      </Navbar.Brand>
    </Link>
  );

  const collapse = (
    <Navbar.Collapse {...props}>
      {getItems(Object.keys(data))}
      <div className="mt-auto mb-md-4" />
      <Footer />
    </Navbar.Collapse>
  );

  return (
    <>
      <Navbar
        expand="md"
        className="navbar-vertical fixed-start mb-2"
        collapseOnSelect={true}
        {...props}
      >
        <Container fluid>
          {toggler}
          {brand}
          {collapse}
        </Container>
      </Navbar>
    </>
  );
}
