import pandas as pd
import json
import os


def read_data(filename, delimiter=',', timeformat='%d.%m.%Y %H:%M'):
    df = pd.read_csv(filename,
                     delimiter=delimiter)
    df['timestamp'] = pd.to_datetime(df.timestamp, format=timeformat).sort_values()
    return df


def read_cost(filename):
    df = pd.read_csv(filename,
                     delimiter=';')
    return df


def read_prices():
    filename = os.path.join('data', 'jan_prices.csv')
    df = pd.read_csv(filename,
                     delimiter=';')
    return df


def get_last(delta):
    return delta * 4.04


if __name__ == '__main__':
    BALANCE = 10000
    household_filename = os.path.join('data', os.path.join('consumption_household', 'sensor_2000_events.csv'))
    df_household = read_data(household_filename, timeformat='%Y-%m-%dT%H:%M:%S')

    data = []

    for i in range(len(df_household.timestamp)):
        time = df_household.timestamp[i].strftime("%Y-%m-%d %H:%M:%S")
        energy = df_household.energy[i]
        delta = df_household.energy_delta[i]
        last_crypto = get_last(delta)
        BALANCE = BALANCE - last_crypto
        res = {
            'timestamp': time,
            'energy': energy,
            'energy_delta': delta,
            'crypto_balance': BALANCE,
            'last_crypto_change': last_crypto
        }
        if delta:
            data.append(res)

    with open('new.json', 'w') as fh:
        json.dump(data, fh)
