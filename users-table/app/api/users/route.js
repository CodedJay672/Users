import { NextResponse } from "next/server";

const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users; 
}

export async function GET(req) {
  const users = await getUsers();
  return NextResponse.json(users);
}