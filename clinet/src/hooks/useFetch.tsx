import React, { useState } from "react";

export default function useFetch<T>(url: string): any {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  //   --------------GET method--------------
  const GET = async () => {
    try {
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   --------------POST method--------------
  const POST = async () => {
    try {
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   --------------PATCH method--------------
  const PATCH = async () => {
    try {
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  //   --------------DELETE method--------------
  const DELETE = async () => {
    try {
    } catch (error: unknown) {
      setError((error as Error).message || "An unknown error occurred.");
    }
  };
  return { data, error, GET, POST, PATCH, DELETE };
}
