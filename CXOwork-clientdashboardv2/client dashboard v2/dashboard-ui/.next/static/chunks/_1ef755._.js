(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_1ef755._.js", {

"[project]/lib/mock-data.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "INITIAL_CLIENT": (()=>INITIAL_CLIENT),
    "MOCK_ADMIN_MESSAGES": (()=>MOCK_ADMIN_MESSAGES),
    "MOCK_ADVISORS": (()=>MOCK_ADVISORS),
    "MOCK_MATCHES": (()=>MOCK_MATCHES),
    "MOCK_MESSAGES": (()=>MOCK_MESSAGES),
    "MOCK_THREADS": (()=>MOCK_THREADS),
    "MOCK_TIMESHEETS": (()=>MOCK_TIMESHEETS)
});
const INITIAL_CLIENT = {
    uid: "mock-user-123",
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex@acmecorp.com",
    phone: "+1 415 555 0100",
    title: "Founder & CEO",
    location: "San Francisco, CA",
    companyName: "Acme Corp",
    companyIndustry: "Information Technology & Services",
    companyStage: "Series A",
    companySize: "11–50",
    companyWebsite: "https://acmecorp.com",
    companyDescription: "Acme Corp builds enterprise workflow automation tools for mid-market teams.",
    profileStatus: "active",
    notifyMessages: true,
    notifyMatches: true,
    notifyProductUpdates: true,
    notifyMarketing: false,
    preferences: {
        role: "CFO",
        lookingFor: "Looking for a fractional CFO with SaaS experience to help us prepare for Series B fundraising. We have $3M ARR, growing 8% MoM, and need help structuring our metrics and investor narrative."
    }
};
const MOCK_ADVISORS = {
    "advisor-1": {
        uid: "advisor-1",
        firstName: "Sarah",
        lastName: "Chen",
        headline: "Fractional CFO | SaaS & FinTech | Series A–C Growth",
        selectedRoles: [
            "CFO"
        ],
        city: "New York, NY",
        hourlyRate: 350,
        about: "15 years of CFO experience across SaaS, FinTech, and marketplaces. I help founders build the financial infrastructure they need to scale confidently — from building board-ready models to leading Series B fundraises.",
        skills: [
            "Financial Modeling",
            "Fundraising",
            "Cash Flow Management",
            "Board Reporting",
            "SaaS Metrics"
        ],
        selectedIndustries: [
            "SaaS",
            "FinTech"
        ],
        engagementTypes: [
            "Fractional",
            "Advisory"
        ],
        photoColor: "bg-purple-500",
        rating: 4.9,
        reviews: 47,
        topRated: true,
        available: true,
        availability: "10–20 hrs/week"
    },
    "advisor-2": {
        uid: "advisor-2",
        firstName: "Marcus",
        lastName: "Rivera",
        headline: "Fractional CTO | Platform Architecture | AI/ML Integration",
        selectedRoles: [
            "CTO"
        ],
        city: "Austin, TX",
        hourlyRate: 400,
        about: "Engineering leader with 3 successful exits. I specialize in helping Series A/B companies scale their tech stack, hire strong engineering teams, and integrate AI capabilities without slowing product velocity.",
        skills: [
            "System Architecture",
            "Team Building",
            "AI/ML",
            "Cloud Infrastructure",
            "Technical Recruiting"
        ],
        selectedIndustries: [
            "SaaS",
            "AI",
            "Enterprise Software"
        ],
        engagementTypes: [
            "Fractional",
            "Project-based"
        ],
        photoColor: "bg-blue-600",
        rating: 4.9,
        reviews: 62,
        topRated: true,
        available: true,
        availability: "20–30 hrs/week"
    },
    "advisor-3": {
        uid: "advisor-3",
        firstName: "Priya",
        lastName: "Sharma",
        headline: "Fractional CMO | B2B Growth | PLG & Sales-Led",
        selectedRoles: [
            "CMO"
        ],
        city: "San Francisco, CA",
        hourlyRate: 300,
        about: "Built marketing orgs at 4 B2B SaaS companies from $1M to $50M ARR. Expert in product-led growth, demand gen, and building brand in competitive markets.",
        skills: [
            "Demand Gen",
            "PLG",
            "Brand Strategy",
            "Content Marketing",
            "ABM"
        ],
        selectedIndustries: [
            "SaaS",
            "B2B",
            "Marketing Tech"
        ],
        engagementTypes: [
            "Fractional",
            "Advisory"
        ],
        photoColor: "bg-rose-500",
        rating: 4.8,
        reviews: 31,
        topRated: false,
        available: true,
        availability: "10–20 hrs/week"
    }
};
const MOCK_MATCHES = [
    {
        id: "match-1",
        advisorUid: "advisor-1",
        clientUid: "mock-user-123",
        status: "active",
        note: "Sarah has deep SaaS CFO experience and has guided 3 companies through their Series B. Her metrics framework work is exactly what you need at this stage."
    },
    {
        id: "match-2",
        advisorUid: "advisor-3",
        clientUid: "mock-user-123",
        status: "active",
        note: "Priya built a very similar PLG motion at her last company and scaled them from $2M to $18M ARR in 18 months. Great fit for your growth challenge."
    }
];
const MOCK_THREADS = [
    {
        id: "t_mock_advisor-1",
        participants: [
            "mock-user-123",
            "advisor-1"
        ],
        clientUid: "mock-user-123",
        advisorUid: "advisor-1",
        lastMessage: "Happy to set up a call this week."
    }
];
const MOCK_MESSAGES = {
    "t_mock_advisor-1": [
        {
            id: "m1",
            text: "Hi Sarah, I came across your profile and would love to connect. We're a Series A SaaS company and need help structuring our financials for a B round.",
            senderRole: "client",
            createdAt: new Date("2025-04-27T10:00:00")
        },
        {
            id: "m2",
            text: "Hi Alex! Thanks for reaching out — this sounds right in my wheelhouse. I've helped several SaaS companies at exactly your stage get their metrics board-ready.",
            senderRole: "advisor",
            createdAt: new Date("2025-04-27T10:45:00")
        },
        {
            id: "m3",
            text: "Happy to set up a call this week.",
            senderRole: "advisor",
            createdAt: new Date("2025-04-27T10:46:00")
        },
        {
            id: "m4",
            text: "That would be great! Does Thursday at 2pm PT work for you?",
            senderRole: "client",
            createdAt: new Date("2025-04-27T11:10:00")
        }
    ]
};
const MOCK_TIMESHEETS = [
    {
        contractId: "contract-1",
        contractTitle: "Fractional CFO Engagement",
        advisorName: "Sarah Chen",
        advisorInitials: "SC",
        advisorColor: "bg-purple-500",
        advisorRole: "Fractional CFO",
        billingType: "hourly_weekly",
        hourlyRate: 350,
        weeklyHoursLimit: 15,
        hoursLast24h: 0,
        hoursThisWeek: 10.5,
        hoursLastWeek: 15,
        hoursSinceStart: 187.5,
        status: "active",
        weeks: [
            {
                weekLabel: "Apr 27 – May 3, 2026",
                weekStart: "2026-04-27",
                totalHours: 10.5,
                totalHoursDisplay: "10:30",
                totalAmount: 3675,
                days: [
                    {
                        date: "2026-04-27",
                        label: "Monday, Apr 27",
                        hoursDecimal: 3,
                        hoursDisplay: "3:00"
                    },
                    {
                        date: "2026-04-28",
                        label: "Tuesday, Apr 28",
                        hoursDecimal: 2.5,
                        hoursDisplay: "2:30"
                    },
                    {
                        date: "2026-04-29",
                        label: "Wednesday, Apr 29",
                        hoursDecimal: 2,
                        hoursDisplay: "2:00"
                    },
                    {
                        date: "2026-04-30",
                        label: "Thursday, Apr 30",
                        hoursDecimal: 3,
                        hoursDisplay: "3:00"
                    },
                    {
                        date: "2026-05-01",
                        label: "Friday, May 1",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    },
                    {
                        date: "2026-05-02",
                        label: "Saturday, May 2",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    },
                    {
                        date: "2026-05-03",
                        label: "Sunday, May 3",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    }
                ]
            },
            {
                weekLabel: "Apr 20 – Apr 26, 2026",
                weekStart: "2026-04-20",
                totalHours: 15,
                totalHoursDisplay: "15:00",
                totalAmount: 5250,
                days: [
                    {
                        date: "2026-04-20",
                        label: "Monday, Apr 20",
                        hoursDecimal: 3,
                        hoursDisplay: "3:00"
                    },
                    {
                        date: "2026-04-21",
                        label: "Tuesday, Apr 21",
                        hoursDecimal: 3,
                        hoursDisplay: "3:00"
                    },
                    {
                        date: "2026-04-22",
                        label: "Wednesday, Apr 22",
                        hoursDecimal: 3,
                        hoursDisplay: "3:00"
                    },
                    {
                        date: "2026-04-23",
                        label: "Thursday, Apr 23",
                        hoursDecimal: 3,
                        hoursDisplay: "3:00"
                    },
                    {
                        date: "2026-04-24",
                        label: "Friday, Apr 24",
                        hoursDecimal: 3,
                        hoursDisplay: "3:00"
                    },
                    {
                        date: "2026-04-25",
                        label: "Saturday, Apr 25",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    },
                    {
                        date: "2026-04-26",
                        label: "Sunday, Apr 26",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    }
                ]
            },
            {
                weekLabel: "Apr 13 – Apr 19, 2026",
                weekStart: "2026-04-13",
                totalHours: 13,
                totalHoursDisplay: "13:00",
                totalAmount: 4550,
                days: [
                    {
                        date: "2026-04-13",
                        label: "Monday, Apr 13",
                        hoursDecimal: 2,
                        hoursDisplay: "2:00"
                    },
                    {
                        date: "2026-04-14",
                        label: "Tuesday, Apr 14",
                        hoursDecimal: 3,
                        hoursDisplay: "3:00"
                    },
                    {
                        date: "2026-04-15",
                        label: "Wednesday, Apr 15",
                        hoursDecimal: 3,
                        hoursDisplay: "3:00"
                    },
                    {
                        date: "2026-04-16",
                        label: "Thursday, Apr 16",
                        hoursDecimal: 2,
                        hoursDisplay: "2:00"
                    },
                    {
                        date: "2026-04-17",
                        label: "Friday, Apr 17",
                        hoursDecimal: 3,
                        hoursDisplay: "3:00"
                    },
                    {
                        date: "2026-04-18",
                        label: "Saturday, Apr 18",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    },
                    {
                        date: "2026-04-19",
                        label: "Sunday, Apr 19",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    }
                ]
            }
        ]
    },
    {
        contractId: "contract-2",
        contractTitle: "Fractional CTO Advisory",
        advisorName: "Marcus Rivera",
        advisorInitials: "MR",
        advisorColor: "bg-blue-600",
        advisorRole: "Fractional CTO",
        billingType: "hourly_weekly",
        hourlyRate: 400,
        weeklyHoursLimit: 10,
        hoursLast24h: 2,
        hoursThisWeek: 6,
        hoursLastWeek: 10,
        hoursSinceStart: 84,
        status: "active",
        weeks: [
            {
                weekLabel: "Apr 27 – May 3, 2026",
                weekStart: "2026-04-27",
                totalHours: 6,
                totalHoursDisplay: "6:00",
                totalAmount: 2400,
                days: [
                    {
                        date: "2026-04-27",
                        label: "Monday, Apr 27",
                        hoursDecimal: 2,
                        hoursDisplay: "2:00"
                    },
                    {
                        date: "2026-04-28",
                        label: "Tuesday, Apr 28",
                        hoursDecimal: 1,
                        hoursDisplay: "1:00"
                    },
                    {
                        date: "2026-04-29",
                        label: "Wednesday, Apr 29",
                        hoursDecimal: 2,
                        hoursDisplay: "2:00"
                    },
                    {
                        date: "2026-04-30",
                        label: "Thursday, Apr 30",
                        hoursDecimal: 1,
                        hoursDisplay: "1:00"
                    },
                    {
                        date: "2026-05-01",
                        label: "Friday, May 1",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    },
                    {
                        date: "2026-05-02",
                        label: "Saturday, May 2",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    },
                    {
                        date: "2026-05-03",
                        label: "Sunday, May 3",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    }
                ]
            },
            {
                weekLabel: "Apr 20 – Apr 26, 2026",
                weekStart: "2026-04-20",
                totalHours: 10,
                totalHoursDisplay: "10:00",
                totalAmount: 4000,
                days: [
                    {
                        date: "2026-04-20",
                        label: "Monday, Apr 20",
                        hoursDecimal: 2,
                        hoursDisplay: "2:00"
                    },
                    {
                        date: "2026-04-21",
                        label: "Tuesday, Apr 21",
                        hoursDecimal: 2,
                        hoursDisplay: "2:00"
                    },
                    {
                        date: "2026-04-22",
                        label: "Wednesday, Apr 22",
                        hoursDecimal: 2,
                        hoursDisplay: "2:00"
                    },
                    {
                        date: "2026-04-23",
                        label: "Thursday, Apr 23",
                        hoursDecimal: 2,
                        hoursDisplay: "2:00"
                    },
                    {
                        date: "2026-04-24",
                        label: "Friday, Apr 24",
                        hoursDecimal: 2,
                        hoursDisplay: "2:00"
                    },
                    {
                        date: "2026-04-25",
                        label: "Saturday, Apr 25",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    },
                    {
                        date: "2026-04-26",
                        label: "Sunday, Apr 26",
                        hoursDecimal: 0,
                        hoursDisplay: "0:00"
                    }
                ]
            }
        ]
    }
];
const MOCK_ADMIN_MESSAGES = [
    {
        id: "a1",
        text: "Welcome to CXOwork! Your profile is under review. We typically take 1–2 business days to match you with the right executives.",
        senderRole: "admin",
        createdAt: new Date("2025-04-20T09:00:00")
    },
    {
        id: "a2",
        text: "Great news — your profile is approved! We've matched you with Sarah Chen (CFO) and Priya Sharma (CMO). Check your Matched CXO tab to view their profiles and send a message.",
        senderRole: "admin",
        createdAt: new Date("2025-04-27T14:00:00")
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/mock-context.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ClientProvider": (()=>ClientProvider),
    "useClient": (()=>useClient)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/mock-data.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature();
"use client";
;
;
const ClientContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function ClientProvider({ children }) {
    _s();
    const [client, setClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_CLIENT"]);
    const updateClientData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClientProvider.useCallback[updateClientData]": (updates)=>{
            setClient({
                "ClientProvider.useCallback[updateClientData]": (prev)=>{
                    if (updates.preferences) {
                        return {
                            ...prev,
                            ...updates,
                            preferences: {
                                ...prev.preferences,
                                ...updates.preferences
                            }
                        };
                    }
                    return {
                        ...prev,
                        ...updates
                    };
                }
            }["ClientProvider.useCallback[updateClientData]"]);
        }
    }["ClientProvider.useCallback[updateClientData]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClientContext.Provider, {
        value: {
            uid: client.uid,
            client,
            loading: false,
            refresh: async ()=>{},
            updateClientData
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/mock-context.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(ClientProvider, "+9vCrTtMukL5g4vSklm5oY7pW30=");
_c = ClientProvider;
function useClient() {
    _s1();
    const ctx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ClientContext);
    if (!ctx) throw new Error("useClient must be inside ClientProvider");
    return ctx;
}
_s1(useClient, "/dMy7t63NXD4eYACoT93CePwGrg=");
var _c;
__turbopack_refresh__.register(_c, "ClientProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/client-dashboard/TopNav.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "TopNav": (()=>TopNav)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/mock-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/clipboard-list.mjs [app-client] (ecmascript) <export default as ClipboardList>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.mjs [app-client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/calendar.mjs [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/receipt.mjs [app-client] (ecmascript) <export default as Receipt>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/message-square.mjs [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/settings.mjs [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/log-out.mjs [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/menu.mjs [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/bell.mjs [app-client] (ecmascript) <export default as Bell>");
;
var _s = __turbopack_refresh__.signature(), _s1 = __turbopack_refresh__.signature(), _s2 = __turbopack_refresh__.signature(), _s3 = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
// ─── Dropdown data ────────────────────────────────────────────────────────────
const HIRE_CXO = [
    {
        group: "Find talent",
        items: [
            {
                label: "Post a job",
                href: "/get-matched",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"],
                desc: "Start a new brief and get matched"
            },
            {
                label: "Find CXO",
                href: "/dashboard/find-cxo",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"],
                desc: "Search & browse all advisors"
            },
            {
                label: "Matched CXO",
                href: "/dashboard/engagements",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                desc: "Your current advisor matches"
            }
        ]
    },
    {
        group: "Manage",
        items: [
            {
                label: "Job posts & proposals",
                href: "/dashboard/briefs",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                desc: "Drafts, published, and archived briefs"
            }
        ]
    }
];
const MANAGE_WORK = [
    {
        group: "Work",
        items: [
            {
                label: "Contracts",
                href: "/dashboard/contracts",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clipboard$2d$list$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ClipboardList$3e$__["ClipboardList"],
                desc: "Active and past contracts"
            },
            {
                label: "Project milestones",
                href: "/dashboard/milestones",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"],
                desc: "Track deliverables & progress"
            },
            {
                label: "Sessions",
                href: "/dashboard/sessions",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"],
                desc: "Scheduled and past advisory sessions"
            },
            {
                label: "Timesheets",
                href: "/dashboard/timesheets",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$receipt$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Receipt$3e$__["Receipt"],
                desc: "Hours logged & weekly billing"
            }
        ]
    }
];
const ALL_NAV_ITEMS = [
    ...HIRE_CXO.flatMap((g)=>g.items),
    ...MANAGE_WORK.flatMap((g)=>g.items),
    {
        label: "Messages",
        href: "/dashboard/messages",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"],
        desc: "Your conversations"
    }
];
// ─── Desktop dropdown ─────────────────────────────────────────────────────────
function NavDropdown({ label, groups, activeHrefs }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = activeHrefs.some((h)=>pathname?.startsWith(h));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NavDropdown.useEffect": ()=>{
            function handleClick(e) {
                if (ref.current && !ref.current.contains(e.target)) setOpen(false);
            }
            document.addEventListener("mousedown", handleClick);
            return ({
                "NavDropdown.useEffect": ()=>document.removeEventListener("mousedown", handleClick)
            })["NavDropdown.useEffect"];
        }
    }["NavDropdown.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen((o)=>!o),
                className: `flex items-center gap-1 px-3 py-2 rounded-lg text-[14px] font-medium transition-colors ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`,
                children: [
                    label,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: `w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`
                    }, void 0, false, {
                        fileName: "[project]/components/client-dashboard/TopNav.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full left-0 mt-1.5 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-2 overflow-hidden",
                children: groups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "px-4 pt-3 pb-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide",
                                children: g.group
                            }, void 0, false, {
                                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            g.items.map((item)=>{
                                const Icon = item.icon;
                                const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    onClick: ()=>setOpen(false),
                                    className: `flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors ${active ? "bg-blue-50" : ""}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `p-1.5 rounded-lg mt-0.5 flex-shrink-0 ${active ? "bg-blue-100" : "bg-gray-100"}`,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: `w-3.5 h-3.5 ${active ? "text-blue-600" : "text-gray-500"}`
                                            }, void 0, false, {
                                                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                                lineNumber: 86,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                            lineNumber: 85,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: `text-sm font-medium ${active ? "text-blue-700" : "text-gray-800"}`,
                                                    children: item.label
                                                }, void 0, false, {
                                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                                    lineNumber: 89,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-500 mt-0.5",
                                                    children: item.desc
                                                }, void 0, false, {
                                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                                    lineNumber: 90,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                            lineNumber: 88,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, item.href, true, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 83,
                                    columnNumber: 19
                                }, this);
                            })
                        ]
                    }, g.group, true, {
                        fileName: "[project]/components/client-dashboard/TopNav.tsx",
                        lineNumber: 77,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/client-dashboard/TopNav.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(NavDropdown, "ba+hF66sAbFlOojeI02RI/9slQo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = NavDropdown;
// ─── Profile menu ─────────────────────────────────────────────────────────────
function ProfileMenu({ initials, name }) {
    _s1();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProfileMenu.useEffect": ()=>{
            function handleClick(e) {
                if (ref.current && !ref.current.contains(e.target)) setOpen(false);
            }
            document.addEventListener("mousedown", handleClick);
            return ({
                "ProfileMenu.useEffect": ()=>document.removeEventListener("mousedown", handleClick)
            })["ProfileMenu.useEffect"];
        }
    }["ProfileMenu.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setOpen((o)=>!o),
                className: "w-8 h-8 rounded-full bg-blue-600 text-white grid place-items-center font-semibold text-xs hover:bg-blue-700 transition",
                title: name,
                children: initials
            }, void 0, false, {
                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-full right-0 mt-1.5 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-2 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b border-gray-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-gray-900",
                                children: name
                            }, void 0, false, {
                                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 mt-0.5",
                                children: "Client account"
                            }, void 0, false, {
                                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/client-dashboard/TopNav.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/dashboard/account-settings",
                        onClick: ()=>setOpen(false),
                        className: "flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                className: "w-4 h-4 text-gray-500"
                            }, void 0, false, {
                                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                lineNumber: 135,
                                columnNumber: 13
                            }, this),
                            " Account settings"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/client-dashboard/TopNav.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-gray-50 mt-1 pt-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                setOpen(false);
                                alert("Sign out — UI demo only.");
                            },
                            className: "flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 w-full transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                    className: "w-4 h-4 text-gray-500"
                                }, void 0, false, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, this),
                                " Log out"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                            lineNumber: 138,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/client-dashboard/TopNav.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/client-dashboard/TopNav.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_s1(ProfileMenu, "wl9VvfhnMVWQ+kCekFjcRPEi3/0=");
_c1 = ProfileMenu;
// ─── Mobile drawer ────────────────────────────────────────────────────────────
function MobileDrawer({ open, onClose }) {
    _s2();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MobileDrawer.useEffect": ()=>{
            if (open) document.body.style.overflow = "hidden";
            else document.body.style.overflow = "";
            return ({
                "MobileDrawer.useEffect": ()=>{
                    document.body.style.overflow = "";
                }
            })["MobileDrawer.useEffect"];
        }
    }["MobileDrawer.useEffect"], [
        open
    ]);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 bg-black/30",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-5 h-[60px] border-b border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                onClick: onClose,
                                className: "flex items-center gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logo.svg",
                                        alt: "CXOwork",
                                        width: 24,
                                        height: 19
                                    }, void 0, false, {
                                        fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-display font-bold text-[17px] tracking-tight text-gray-900",
                                        children: "CXOwork"
                                    }, void 0, false, {
                                        fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onClose,
                                className: "p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "w-5 h-5"
                                }, void 0, false, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 170,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/client-dashboard/TopNav.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex-1 overflow-y-auto py-3 px-3 space-y-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    router.push("/get-matched");
                                    onClose();
                                },
                                className: "w-full flex items-center gap-3 px-3 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this),
                                    " Post a job"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                lineNumber: 176,
                                columnNumber: 11
                            }, this),
                            ALL_NAV_ITEMS.map((item)=>{
                                const Icon = item.icon;
                                const active = pathname === item.href || pathname?.startsWith(item.href + "/");
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    onClick: onClose,
                                    className: `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: `w-4 h-4 flex-shrink-0 ${active ? "text-blue-600" : "text-gray-500"}`
                                        }, void 0, false, {
                                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                            lineNumber: 191,
                                            columnNumber: 17
                                        }, this),
                                        item.label
                                    ]
                                }, item.href, true, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/client-dashboard/TopNav.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-gray-100 px-3 py-3 space-y-0.5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard/account-settings",
                            onClick: onClose,
                            className: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                    className: "w-4 h-4 text-gray-500"
                                }, void 0, false, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 201,
                                    columnNumber: 13
                                }, this),
                                " Account settings"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/client-dashboard/TopNav.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s2(MobileDrawer, "qIbXzL/glMgPmW/TFWAi/FqCkIk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = MobileDrawer;
function TopNav() {
    _s3();
    const { client } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const displayName = [
        client.firstName,
        client.lastName
    ].filter(Boolean).join(" ") || "User";
    const initials = ((client.firstName?.[0] || "") + (client.lastName?.[0] || "")).toUpperCase() || "?";
    const messagesActive = pathname?.startsWith("/dashboard/messages");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-40 bg-white border-b border-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1280px] mx-auto px-4 sm:px-8 h-[60px] flex items-center relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setMobileOpen(true),
                            className: "md:hidden p-2 -ml-1 mr-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition flex-shrink-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                className: "w-5 h-5"
                            }, void 0, false, {
                                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/dashboard",
                            className: "flex items-center gap-2.5 hover:opacity-80 transition-opacity flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/logo.svg",
                                    alt: "CXOwork",
                                    width: 28,
                                    height: 22,
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-display font-bold text-[18px] tracking-tight text-gray-900",
                                    children: "CXOwork"
                                }, void 0, false, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavDropdown, {
                                    label: "Hire CXO",
                                    groups: HIRE_CXO,
                                    activeHrefs: [
                                        "/dashboard/engagements",
                                        "/dashboard/find-cxo",
                                        "/dashboard/briefs",
                                        "/get-matched"
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 242,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NavDropdown, {
                                    label: "Manage work",
                                    groups: MANAGE_WORK,
                                    activeHrefs: [
                                        "/dashboard/contracts",
                                        "/dashboard/milestones",
                                        "/dashboard/sessions",
                                        "/dashboard/timesheets"
                                    ]
                                }, void 0, false, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 247,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/dashboard/messages",
                                    className: `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[14px] font-medium transition-colors ${messagesActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                            lineNumber: 258,
                                            columnNumber: 15
                                        }, this),
                                        "Messages",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-0.5 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full grid place-items-center font-bold leading-none",
                                            children: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                            lineNumber: 260,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1"
                        }, void 0, false, {
                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                            lineNumber: 265,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 sm:gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push("/get-matched"),
                                    className: "hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                            lineNumber: 273,
                                            columnNumber: 15
                                        }, this),
                                        " Post a job"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 269,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bell$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bell$3e$__["Bell"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                            lineNumber: 276,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                            lineNumber: 277,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 275,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileMenu, {
                                    initials: initials,
                                    name: displayName
                                }, void 0, false, {
                                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                                    lineNumber: 279,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/client-dashboard/TopNav.tsx",
                            lineNumber: 268,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/client-dashboard/TopNav.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MobileDrawer, {
                open: mobileOpen,
                onClose: ()=>setMobileOpen(false)
            }, void 0, false, {
                fileName: "[project]/components/client-dashboard/TopNav.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s3(TopNav, "J88h/MosfkDh3MwuiY3cZTj0Etg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c3 = TopNav;
var _c, _c1, _c2, _c3;
__turbopack_refresh__.register(_c, "NavDropdown");
__turbopack_refresh__.register(_c1, "ProfileMenu");
__turbopack_refresh__.register(_c2, "MobileDrawer");
__turbopack_refresh__.register(_c3, "TopNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/client-dashboard/DashboardShell.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "DashboardShell": (()=>DashboardShell)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/mock-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$client$2d$dashboard$2f$TopNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/client-dashboard/TopNav.tsx [app-client] (ecmascript)");
"use client";
;
;
;
function DashboardShell({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClientProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gray-50 text-gray-900",
            style: {
                colorScheme: "light"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$client$2d$dashboard$2f$TopNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TopNav"], {}, void 0, false, {
                    fileName: "[project]/components/client-dashboard/DashboardShell.tsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                    className: "max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/client-dashboard/DashboardShell.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/client-dashboard/DashboardShell.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/client-dashboard/DashboardShell.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = DashboardShell;
var _c;
__turbopack_refresh__.register(_c, "DashboardShell");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/dashboard/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=_1ef755._.js.map