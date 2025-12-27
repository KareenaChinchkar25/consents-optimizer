function getSafeHostname(value) {
  try {
    if (!value || typeof value !== "string") return "Unknown";

    const safeUrl = value.startsWith("http")
      ? value
      : `https://${value}`;

    return new URL(safeUrl).hostname;
  } catch (err) {
    console.warn("Invalid URL detected:", value);
    return "Invalid URL";
  }
}

import React, { useState, useMemo } from "react";
import {
    Calendar,
    Clock,
    Search,
    Download,
    Camera,
    MapPin,
    Mic,
    Shield,
    Globe,
    ChevronDown,
    CheckCircle,
    XCircle,
    AlertCircle,
} from "lucide-react";
import { useConsent } from "../context/ConsentContext";

const HistoryPage = () => {
    const { consents, loading } = useConsent();

    const [filterDateRange, setFilterDateRange] = useState("all");
    const [filterPermission, setFilterPermission] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedRow, setExpandedRow] = useState(null);
    const exportToPDF = () => {
  const printWindow = window.open("", "_blank")

  const rows = filteredData
    .map(
      (item) => `
      <tr>
        <td>${item.website}</td>
        <td>${item.permission}</td>
        <td>${item.status}</td>
        <td>${new Date(item.grantedOn).toLocaleString()}</td>
        <td>${item.riskLevel}</td>
      </tr>
    `
    )
    .join("")

  printWindow.document.write(`
    <html>
      <head>
        <title>Consent History</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; }
          h1 { margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; font-size: 12px; }
          th { background: #f4f4f4; text-align: left; }
        </style>
      </head>
      <body>
        <h1>Consent History</h1>
        <table>
          <thead>
            <tr>
              <th>Website</th>
              <th>Permission</th>
              <th>Status</th>
              <th>Date</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `)

  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
}
const exportToCSV = () => {
  const headers = [
    "Website",
    "Permission",
    "Status",
    "Granted On",
    "Risk Level",
    "Purpose",
  ]

  const rows = filteredData.map((item) => [
    item.website,
    item.permission,
    item.status,
    item.grantedOn,
    item.riskLevel,
    item.purpose || "",
  ])

  const csvContent =
    [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = "consent_history.csv"
  link.click()

  URL.revokeObjectURL(url)
}

    const getWebsiteName = (url) => {
        try {
            const hostname = new URL(url).hostname;
            return hostname
                .replace("www.", "")
                .split(".")[0]
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());
        } catch {
            return url;
        }
    };

    const historyData = consents.filter((c) => {
        const status = c.status?.toLowerCase();
        return status !== "active";
    });

    const isWithinDays = (dateString, days) => {
        const itemDate = new Date(dateString);
        const today = new Date();
        const diffDays =
            (today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= days;
    };

    const filteredData = historyData.filter((item) => {
        const grantedDate = item.grantedOn || item.updatedAt;

        const matchesDate =
            filterDateRange === "all" ||
            (filterDateRange === "7days" && isWithinDays(grantedDate, 7)) ||
            (filterDateRange === "30days" && isWithinDays(grantedDate, 30));

        const matchesPermission =
            filterPermission === "all" || item.permission === filterPermission;

        const matchesStatus =
            filterStatus === "all" || item.status === filterStatus;

        const matchesSearch =
            searchQuery === "" ||
            item.website.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesDate && matchesPermission && matchesStatus && matchesSearch;
    });
    const getHostname = (website) => {
  if (!website || typeof website !== "string") return "Unknown";

  try {
   
    const url = website.startsWith("http")
      ? website
      : `https://${website}`;

    return new URL(url).hostname;
  } catch {
    return "Invalid URL";
  }

};


    const getPermissionIcon = (type) => {
        if (type === "camera") return <Camera className="w-4 h-4" />;
        if (type === "location") return <MapPin className="w-4 h-4" />;
        if (type === "microphone") return <Mic className="w-4 h-4" />;
        return <Shield className="w-4 h-4" />;
    };

    const getRiskBadge = (level) => {
        if (level === "high") return "bg-red-100 text-red-800";
        if (level === "medium") return "bg-yellow-100 text-yellow-800";
        return "bg-green-100 text-green-800";
    };
    const formatDateTime = (dateString) => {
        const d = new Date(dateString);
        return {
            date: d.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
            time: d.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
    };

    if (loading) {
        return <div className="p-6 text-gray-600">Loading consent history…</div>;
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-1">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <h1 className="text-3xl font-bold text-gray-900">Consent History</h1>
                </div>
                <p className="text-gray-600">
                    Review all permissions you’ve granted or revoked over time
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                    value={filterDateRange}
                    onChange={(e) => setFilterDateRange(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="all">All time</option>
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                </select>

                <select
                    value={filterPermission}
                    onChange={(e) => setFilterPermission(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="all">All permissions</option>
                    <option value="camera">Camera</option>
                    <option value="location">Location</option>
                    <option value="microphone">Microphone</option>
                </select>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="all">All status</option>
                    <option value="revoked">Revoked</option>
                    <option value="expired">Expired</option>
                </select>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        className="pl-9 pr-3 py-2 w-full border rounded-lg"
                        placeholder="Search website"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredData.map((item) => {
                    const { date, time } = formatDateTime(
                        item.grantedOn || item.updatedAt
                    );

                    return (
                        <div
                            key={item.consentId}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                        >
                            <div
                                className="p-5 cursor-pointer flex items-center gap-4"
                                onClick={() =>
                                    setExpandedRow(expandedRow === item.consentId ? null : item.consentId)
                                }
                            >
                                <Globe className="w-5 h-5 text-gray-500" />

                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{getWebsiteName(item.website)}</p>
                                  
                                    <p className="text-sm text-gray-500">{item.permission}</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    {getPermissionIcon(item.permission)}
                                    <span className="text-sm text-gray-700">{item.permission}</span>
                                </div>

                              

                                <div className="text-sm text-gray-600">
                                    {date} · {time}
                                </div>

                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${expandedRow === item.consentId ? "rotate-180" : ""
                                        }`}
                                />
                            </div>

                            {expandedRow === item.consentId && (
                                <div className="border-t bg-gray-50 p-5 grid md:grid-cols-3 gap-6">
                                    <div>
                                        <h4 className="text-sm font-semibold">Purpose</h4>
                                        <p className="text-sm text-gray-600">{item.purpose || "—"}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold">Retention</h4>
                                        <p className="text-sm text-gray-600">
                                            {item.retention_months ? `${item.retention_months} months` : "—"}
                                        </p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold">Data Flow</h4>
                                        <p className="text-sm text-gray-600">{item.dataFlow || "—"}</p>
                                    </div>

                                    {item.riskLevel === "high" && (
                                        <div className="md:col-span-3 flex gap-2 bg-red-50 border border-red-200 p-3 rounded-lg">
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                            <p className="text-sm text-red-700">
                                                High-risk consent involving third-party data sharing.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-8 flex justify-between items-center text-sm text-gray-500">
  <span>
    Showing {filteredData.length} of {historyData.length} records
  </span>

  <div className="flex gap-3">
    <button
      onClick={exportToCSV}
      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
    >
      <Download className="w-4 h-4" />
      CSV
    </button>

    <button
      onClick={exportToPDF}
      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
    >
      <Download className="w-4 h-4" />
      PDF
    </button>
  </div>
</div>

        </div>
    );
};

export default HistoryPage;
