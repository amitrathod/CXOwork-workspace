(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_dashboard_profile_page_tsx_910bff._.js", {

"[project]/app/dashboard/profile/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ClientProfilePage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/mock-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
const STAGE_OPTIONS = [
    "",
    "Idea",
    "Pre-seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C+",
    "Growth",
    "Public"
];
const SIZE_OPTIONS = [
    "",
    "Just me (1)",
    "2–10",
    "11–50",
    "51–200",
    "201–500",
    "500+"
];
const INDUSTRY_OPTIONS = [
    "",
    "Financial Services",
    "Information Technology & Services",
    "Internet",
    "Computer Software",
    "Marketing & Advertising",
    "Health, Wellness & Fitness",
    "Hospital & Health Care",
    "Real Estate",
    "Retail",
    "Banking",
    "Management Consulting",
    "Other"
];
const ROLE_OPTIONS = [
    "",
    "CFO",
    "CTO",
    "CMO",
    "COO",
    "CPO",
    "CHRO",
    "CSO",
    "CRO",
    "Other"
];
const FIELD_LIGHT = {
    background: "#fff",
    color: "#111827",
    colorScheme: "light",
    WebkitTextFillColor: "#111827"
};
function ClientProfilePage() {
    _s();
    const { client, updateClientData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"])();
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        ...client,
        prefRole: client.preferences?.role || "",
        prefLookingFor: client.preferences?.lookingFor || ""
    });
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientProfilePage.useEffect": ()=>{
            setDraft({
                ...client,
                prefRole: client.preferences?.role || "",
                prefLookingFor: client.preferences?.lookingFor || ""
            });
        }
    }["ClientProfilePage.useEffect"], [
        client
    ]);
    function set(k, v) {
        setDraft((d)=>({
                ...d,
                [k]: v
            }));
    }
    const isDirty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ClientProfilePage.useMemo[isDirty]": ()=>{
            const keys = [
                "firstName",
                "lastName",
                "phone",
                "title",
                "location",
                "companyName",
                "companyIndustry",
                "companyStage",
                "companySize",
                "companyWebsite",
                "companyDescription"
            ];
            for (const k of keys){
                if (draft[k]?.trim?.() !== (client[k] ?? "")) return true;
            }
            if (draft.prefRole !== (client.preferences?.role || "")) return true;
            if (draft.prefLookingFor.trim() !== (client.preferences?.lookingFor || "")) return true;
            return false;
        }
    }["ClientProfilePage.useMemo[isDirty]"], [
        draft,
        client
    ]);
    async function save() {
        setSaving(true);
        setSaved("");
        await new Promise((r)=>setTimeout(r, 600));
        updateClientData({
            firstName: draft.firstName,
            lastName: draft.lastName,
            phone: draft.phone,
            title: draft.title,
            location: draft.location,
            companyName: draft.companyName,
            companyIndustry: draft.companyIndustry,
            companyStage: draft.companyStage,
            companySize: draft.companySize,
            companyWebsite: draft.companyWebsite,
            companyDescription: draft.companyDescription,
            preferences: {
                role: draft.prefRole,
                lookingFor: draft.prefLookingFor
            }
        });
        setSaving(false);
        setSaved("Saved");
        setTimeout(()=>setSaved(""), 3000);
    }
    const initials = ((client.firstName?.[0] || "") + (client.lastName?.[0] || "")).toUpperCase() || "?";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-3xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start justify-between mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-[24px] font-semibold tracking-tight",
                                children: "My profile"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-500 mt-1",
                                children: "Keep your details up to date so we can match you with the right advisors."
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: save,
                        disabled: saving || !isDirty && !saved,
                        className: [
                            "text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors",
                            isDirty || saving ? "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50" : saved ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        ].join(" "),
                        children: saving ? "Saving…" : saved || "Save changes"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/profile/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-gray-200 rounded-xl p-5 mb-5 flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-14 h-14 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-lg shrink-0",
                        children: initials
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center flex-wrap gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[16px] font-bold",
                                        children: [
                                            draft.firstName,
                                            draft.lastName
                                        ].filter(Boolean).join(" ") || "Your name"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/profile/page.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center text-[10.5px] font-semibold uppercase tracking-wider px-2 py-[3px] rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200",
                                        children: "Active"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/profile/page.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-[12.5px] text-gray-500",
                                children: client.email
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/profile/page.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                title: "Personal",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "First name",
                                value: draft.firstName,
                                onChange: (v)=>set("firstName", v)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 73,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Last name",
                                value: draft.lastName,
                                onChange: (v)=>set("lastName", v)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 73,
                                columnNumber: 102
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Email",
                                value: client.email,
                                onChange: ()=>{},
                                readOnly: true,
                                note: "Used for sign-in"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Phone",
                                value: draft.phone,
                                onChange: (v)=>set("phone", v),
                                placeholder: "+1 415 555 0100"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Title",
                                value: draft.title,
                                onChange: (v)=>set("title", v),
                                placeholder: "Founder & CEO"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 78,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Location",
                                value: draft.location,
                                onChange: (v)=>set("location", v),
                                placeholder: "San Francisco, CA"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 78,
                                columnNumber: 117
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/profile/page.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                title: "Company",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Company name",
                                value: draft.companyName,
                                onChange: (v)=>set("companyName", v)
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 82,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Website",
                                value: draft.companyWebsite,
                                onChange: (v)=>set("companyWebsite", v),
                                placeholder: "https://acme.com"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 82,
                                columnNumber: 108
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                                label: "Industry",
                                value: draft.companyIndustry,
                                onChange: (v)=>set("companyIndustry", v),
                                options: INDUSTRY_OPTIONS
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                                label: "Stage",
                                value: draft.companyStage,
                                onChange: (v)=>set("companyStage", v),
                                options: STAGE_OPTIONS
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                                label: "Company size",
                                value: draft.companySize,
                                onChange: (v)=>set("companySize", v),
                                options: SIZE_OPTIONS
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 87,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 87,
                                columnNumber: 132
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5",
                                children: "Description"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: draft.companyDescription,
                                onChange: (e)=>set("companyDescription", e.target.value),
                                placeholder: "What does your company do?",
                                rows: 4,
                                style: FIELD_LIGHT,
                                className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 resize-y"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/profile/page.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                title: "Advisor search preferences",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5",
                                children: "Role you are looking to hire?"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 97,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Select, {
                                label: "",
                                value: draft.prefRole,
                                onChange: (v)=>set("prefRole", v),
                                options: ROLE_OPTIONS
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5",
                                children: "Tell us a bit more"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: draft.prefLookingFor,
                                onChange: (e)=>set("prefLookingFor", e.target.value),
                                placeholder: "What's the situation? Stage, industry, what kind of executive would be a fit…",
                                rows: 4,
                                style: FIELD_LIGHT,
                                className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500 resize-y"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1.5 text-[12px] text-gray-500",
                                children: "The more context you share, the better we can match you."
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/profile/page.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/profile/page.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/profile/page.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(ClientProfilePage, "JzL6dpF3zwVDKPOVp2A3Utr0Mwg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mock$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClient"]
    ];
});
_c = ClientProfilePage;
function Section({ title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border border-gray-200 rounded-xl p-5 mb-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-[12px] font-bold uppercase tracking-[0.07em] text-gray-600 mb-3",
                children: title
            }, void 0, false, {
                fileName: "[project]/app/dashboard/profile/page.tsx",
                lineNumber: 113,
                columnNumber: 79
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/profile/page.tsx",
        lineNumber: 113,
        columnNumber: 10
    }, this);
}
_c1 = Section;
function Row({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 last:mb-0",
        children: children
    }, void 0, false, {
        fileName: "[project]/app/dashboard/profile/page.tsx",
        lineNumber: 116,
        columnNumber: 10
    }, this);
}
_c2 = Row;
function Field({ label, value, onChange, placeholder, readOnly, note }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5",
                children: [
                    label,
                    note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-2 text-[10px] font-semibold uppercase tracking-wider text-gray-500 bg-gray-100 border border-gray-200 rounded-full px-1.5 py-[1px] normal-case",
                        children: note
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 122,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/profile/page.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: value,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                readOnly: readOnly,
                style: readOnly ? {
                    background: "#f9fafb",
                    color: "#6b7280",
                    colorScheme: "light",
                    WebkitTextFillColor: "#6b7280"
                } : {
                    background: "#fff",
                    color: "#111827",
                    colorScheme: "light",
                    WebkitTextFillColor: "#111827"
                },
                className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/profile/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/profile/page.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
_c3 = Field;
function Select({ label, value, onChange, options }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "block text-[12px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5",
                children: label
            }, void 0, false, {
                fileName: "[project]/app/dashboard/profile/page.tsx",
                lineNumber: 133,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: value,
                onChange: (e)=>onChange(e.target.value),
                style: {
                    background: "#fff",
                    color: "#111827",
                    colorScheme: "light",
                    WebkitTextFillColor: "#111827"
                },
                className: "w-full px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500",
                children: options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: o,
                        children: o || "—"
                    }, o || "_blank", false, {
                        fileName: "[project]/app/dashboard/profile/page.tsx",
                        lineNumber: 136,
                        columnNumber: 27
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/dashboard/profile/page.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/profile/page.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_c4 = Select;
var _c, _c1, _c2, _c3, _c4;
__turbopack_refresh__.register(_c, "ClientProfilePage");
__turbopack_refresh__.register(_c1, "Section");
__turbopack_refresh__.register(_c2, "Row");
__turbopack_refresh__.register(_c3, "Field");
__turbopack_refresh__.register(_c4, "Select");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/dashboard/profile/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_dashboard_profile_page_tsx_910bff._.js.map