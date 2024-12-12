import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoApp from './TodoApp';

describe('TodoApp', () => {
    beforeEach(() => {
        render(<TodoApp />);
    });

    test('renders TodoApp component', async () => {
        const elementOne = await screen.findByText(/Тестовое задание/i);
        const elementTwo = await screen.findByText(/Прекрасный код/i);
        const elementThree = await screen.findByText(/Покрытие тестами/i);

        expect(elementOne).toBeInTheDocument();
        expect(elementTwo).toBeInTheDocument();
        expect(elementThree).toBeInTheDocument();
    });

    test('adds a new todo item', async () => {
        const input = await screen.findByPlaceholderText(/What needs to be done?/i);



        await act(async () => {
            fireEvent.change(input, { target: { value: 'Новое задание' } });
            fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

        });

        await waitFor(async () => {
            expect(await screen.getByText(/Тестовое задание/i)).toBeInTheDocument();
        })

    });

    test('toggles todo list visibility', async () => {
        const toggleButton = screen.getByTitle(/toggleButton/i);
        const todoList = screen.getByTitle('listToDoTitle');

        expect(todoList).toBeVisible();

        await act(async () => {
            fireEvent.click(toggleButton);
        });

        await waitFor(() => {
            expect(todoList).not.toBeInTheDocument();
        });
    });

    test('clears completed todos', async () => {
        const clearButton = await screen.getByText("Clear completed");

        await act(async () => {
            fireEvent.click(clearButton);
        });

        expect(await screen.queryByText(/Прекрасный код/i)).not.toBeInTheDocument();
    });

    test('filters active todos', async () => {
        const activeFilterButton = await screen.getByText("Active");

        await act(async () => {
            fireEvent.click(activeFilterButton);
        });

        expect(await screen.getByText(/Тестовое задание/i)).toBeInTheDocument();
        expect(await screen.queryByText(/Прекрасный код/i)).not.toBeInTheDocument();
        expect(await screen.getByText(/Покрытие тестами/i)).toBeInTheDocument();
    });

    test('filters completed todos', async () => {
        const completedFilterButton = await screen.getByText("Completed");

        await act(async () => {
            fireEvent.click(completedFilterButton);
        });

        expect(await screen.queryByText(/Тестовое задание/i)).not.toBeInTheDocument();
        expect(await screen.getByText(/Прекрасный код/i)).toBeInTheDocument();
        expect(await screen.queryByText(/Покрытие тестами/i)).not.toBeInTheDocument();
    });
});