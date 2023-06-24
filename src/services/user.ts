import axios, { ResDataType } from "./ajax";
import { HOST_ADDRESS } from "../constant";

// Retrieve user info
export async function getUserInfoService(): Promise<ResDataType> {
  const url = `${HOST_ADDRESS}/api/user/info`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

// Register
export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = `${HOST_ADDRESS}/api/user/register`;
  const body = { username, password, nickname: nickname || username };
  const data = (await axios.post(url, body)) as ResDataType;
  return data;
}

// Login
export async function loginService(
  username: string,
  password: string
): Promise<ResDataType> {
  const url = `${HOST_ADDRESS}/api/user/login`;
  const body = { username, password };
  const data = (await axios.post(url, body)) as ResDataType;
  return data;
}
