import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">GES-PDC Member Registration Form</h1>
      </Link>
      <AuthOptions />
    </header>
  );
}
