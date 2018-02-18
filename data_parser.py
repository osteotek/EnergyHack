import os
import json
import pandas as pd
import plotly as py


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


if __name__ == '__main__':
    factory_filename = os.path.join('data', os.path.join('consumption_factory', 'consumption_factory_1.csv'))
    household_filename = os.path.join('data', os.path.join('consumption_household', 'sensor_2000_events.csv'))
    generation_filename = os.path.join('data', 'generation.csv')
    cost_filename = os.path.join('data', 'cost.csv')

    df_factory = read_data(factory_filename, delimiter=';')
    df_household = read_data(household_filename, timeformat='%Y-%m-%dT%H:%M:%S')
    df_gen = read_data(generation_filename, delimiter=';')

    generation_data = [
        {
            'x': df_gen.timestamp,
            'y': df_gen[col],
            'name': col
        } for col in [x for x in df_gen.columns if not x.startswith('timestamp')]]

    factory_data = [
        {
            'x': df_factory.timestamp,
            'y': df_factory.energy,
            'name': 'factory'
        }]

    household_data = [
        {
            'x': df_household.timestamp,
            'y': df_household.energy,
            'name': 'household'
        }
    ]


    res = {
        'timestamp': df_household.timestamp,
        'energy': df_household.energy,
        'energy_delta': df_household.energy_delta,
        'crypto_balance': 0,
        'last_crypto_change': 0
    }
    with open('new.json', 'w') as fh:
        json.dump(res, fh)

    plot_data = household_data
    plot_data.extend(generation_data)
    plot_data.extend(factory_data)

    py.offline.plot(plot_data, filename="plot_consumption.html")

    df_prices = read_prices()
    py.offline.plot([
        {
            'x': df_prices.T.iloc[0],
            'y': df_prices.T[i][1:],
            'name': i
        } for i in range(len(df_prices.date))
    ], filename="plot_cost.html")
