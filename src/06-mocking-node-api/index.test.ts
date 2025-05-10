// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

const DELAY = 1000;
const FILE_PATH = 'src/file.txt';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, DELAY);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, DELAY);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, DELAY);
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const doStuffByIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, DELAY);
    expect(doStuffByIntervalSpy).toHaveBeenCalledWith(callback, DELAY);
  });

  test('should call callback multiple times after multiple intervals', async () => {
    const callback = jest.fn();
    doStuffByInterval(callback, DELAY);
    await jest.advanceTimersByTimeAsync(DELAY * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathJoinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(FILE_PATH);
    expect(pathJoinSpy).toHaveBeenCalledWith(__dirname, FILE_PATH);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const result = await readFileAsynchronously(FILE_PATH);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const FILE_CONTENT = 'Hello world!';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockReturnValue(new Promise((resolve) => resolve(FILE_CONTENT)));
    const result = await readFileAsynchronously(FILE_PATH);
    expect(result).toBe(FILE_CONTENT);
  });
});
