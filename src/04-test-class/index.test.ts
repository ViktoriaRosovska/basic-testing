// Uncomment the code below and write your tests
import { getBankAccount } from '.';

import { BankAccount } from '04-test-class';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(5000);
    expect(bankAccount).toBeInstanceOf(BankAccount);
    expect(bankAccount.getBalance()).toEqual(5000);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(8000);
    const balance = bankAccount.getBalance();
    expect(() => bankAccount.withdraw(balance + 10)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(2000);
    const balance = bankAccount.getBalance();
    const otherBankAccount = getBankAccount(3000);
    expect(() => bankAccount.transfer(balance + 100, otherBankAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(2000);
    expect(() => bankAccount.transfer(500, bankAccount)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const bankAccount = getBankAccount(3000);
    const balance = bankAccount.getBalance();
    const deposit = bankAccount.deposit(2000);
    expect(deposit).toBeInstanceOf(BankAccount);
    expect(deposit.getBalance()).toEqual(balance + 2000);
  });

  test('should withdraw money', () => {
    // Write your test here
  });

  test('should transfer money', () => {
    const bankAccount = new BankAccount(2000);
    const otherBankAccount = new BankAccount(3000);
    jest.spyOn(bankAccount, 'transfer');
    bankAccount.transfer(500, otherBankAccount);
    expect(bankAccount.transfer).toHaveBeenCalledTimes(1);
    const result = bankAccount.transfer(500, otherBankAccount);
    expect(result).toBe(bankAccount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
