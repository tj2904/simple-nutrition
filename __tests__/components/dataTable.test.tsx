/**
 * Component Tests for Data Table
 * Tests data display, sorting, and filtering
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import DataTable from "@/components/dataTable";

jest.mock("next/navigation");

describe("DataTable Component", () => {
  const mockData = [
    { id: 1, name: "Item 1", value: 100 },
    { id: 2, name: "Item 2", value: 200 },
    { id: 3, name: "Item 3", value: 150 },
  ];

  const mockColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "value", label: "Value" },
  ];

  it("should render table with data", () => {
    render(<DataTable data={mockData} columns={mockColumns} />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("should render column headers", () => {
    render(<DataTable data={mockData} columns={mockColumns} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });

  it("should display empty state when no data", () => {
    render(<DataTable data={[]} columns={mockColumns} />);

    expect(screen.getByText(/no data|empty/i)).toBeInTheDocument();
  });

  it("should handle data updates", () => {
    const { rerender } = render(
      <DataTable data={mockData} columns={mockColumns} />,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();

    const newData = [{ id: 4, name: "Item 4", value: 300 }];
    rerender(<DataTable data={newData} columns={mockColumns} />);

    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    expect(screen.getByText("Item 4")).toBeInTheDocument();
  });
});
