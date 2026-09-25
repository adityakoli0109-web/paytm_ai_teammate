import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from "recharts";
import "./style.css";

const sales = [
  { day: "Mon", revenue: 18400, orders: 112 },
  { day: "Tue", revenue: 20100, orders: 126 },
  { day: "Wed", revenue: 21900, orders: 139 },
  { day: "Thu", revenue: 20800, orders: 131 },
  { day: "Fri", revenue: 24100, orders: 154 },
  { day: "Sat", revenue: 26800, orders: 171 },
  { day: "Sun", revenue: 23100, orders: 148 }
];

const workflow = ["Analyze", "Detect", "Recommend", "Approve", "Execute", "Report"];

function money(n) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(n);
}

function App() {
  const [activeStep, setActiveStep] = useState(3);
  const [executing, setExecuting] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const totals = useMemo(() => ({
    revenue: sales.reduce((a, b) => a + b.revenue, 0),
    orders: sales.reduce((a, b) => a + b.orders, 0)
  }), []);

  const executeAction = () => {
    if (executing || executed) return;
    setExecuting(true);
    setActiveStep(4);
    setTimeout(() => {
      setExecuting(false);
      setExecuted(true);
      setActiveStep(5);
      setShowReport(true);
    }, 1200);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brandMark">P</div>
          <div>
            <div className="eyebrow">PAYTM BUILD FOR INDIA • TRACK 3</div>
            <h1>Merchant AI Teammate</h1>
            <p>Your autonomous business partner — Analyze → Decide → Act → Report</p>
          </div>
        </div>
        <div className="online"><span /> AI ONLINE</div>
      </header>

      <main>
        <section className="hero">
          <div>
            <div className="heroKicker">GOOD MORNING, MERCHANT 👋</div>
            <h2>Your AI teammate found a revenue opportunity.</h2>
            <p>It analyzed recent transactions, customer activity and peak-hour behavior.</p>
          </div>
          <div className="confidence">
            <strong>89%</strong>
            <span>AI confidence</span>
          </div>
        </section>

        <section className="metrics">
          <div className="metricCard">
            <span>7-day revenue</span>
            <strong>{money(totals.revenue)}</strong>
            <small className="positive">↑ 12.8% vs previous week</small>
          </div>
          <div className="metricCard">
            <span>Transactions</span>
            <strong>{totals.orders.toLocaleString("en-IN")}</strong>
            <small>Across 7 days</small>
          </div>
          <div className="metricCard">
            <span>Conversion rate</span>
            <strong>18.6%</strong>
            <small className="positive">↑ 2.4 pts this week</small>
          </div>
          <div className="metricCard highlight">
            <span>Revenue at opportunity</span>
            <strong>{money(18450)}</strong>
            <small>Estimated recoverable</small>
          </div>
        </section>

        <section className="mainGrid">
          <div className="card chartCard">
            <div className="cardHead">
              <div>
                <h3>Revenue performance</h3>
                <p>Last 7 days • live merchant view</p>
              </div>
              <span className="pill">LIVE DATA</span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={sales}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopOpacity={0.28} />
                    <stop offset="100%" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
                />
                <Tooltip
                  formatter={(v) => [money(v), "Revenue"]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#revenueFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card insightCard">
            <div className="cardHead">
              <div>
                <h3>🤖 AI Business Insight</h3>
                <p>What your teammate detected</p>
              </div>
              <span className="confidenceSmall">89%</span>
            </div>
            <div className="insightTag">OPPORTUNITY DETECTED</div>
            <h4>Evening conversion is 14% below its normal peak.</h4>
            <p className="muted">
              Customers who usually purchase between 6–9 PM are visiting, but fewer are completing checkout.
            </p>
            <div className="reason">
              <div><b>Why it matters</b><span>~₹18.4K estimated revenue gap</span></div>
              <div><b>Audience</b><span>1,842 active evening customers</span></div>
              <div><b>Signal</b><span>High intent • low conversion</span></div>
            </div>
          </div>
        </section>

        <section className="workflowSection">
          <div className="sectionTitle">
            <div>
              <h3>Autonomous decision flow</h3>
              <p>Every action stays under merchant approval.</p>
            </div>
            <span className="guard">● Human-in-the-loop</span>
          </div>
          <div className="workflow">
            {workflow.map((step, i) => (
              <button
                key={step}
                className={`step ${i <= activeStep ? "active" : ""} ${i === activeStep ? "current" : ""}`}
                onClick={() => !executed && setActiveStep(i)}
              >
                <span>{i + 1}</span>
                <b>{step}</b>
                <small>{i < activeStep ? "Complete" : i === activeStep ? "Current" : "Pending"}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="card actionCard">
          <div className="actionIcon">⚡</div>
          <div className="actionText">
            <div className="insightTag blue">RECOMMENDED ACTION</div>
            <h3>Launch a 10% evening offer</h3>
            <p>Target customers active between 6–9 PM with a limited-time offer. The AI predicts a measurable lift in checkout conversion.</p>
            <div className="chips">
              <span>🎯 1,842 customers</span>
              <span>📈 +8–12% expected lift</span>
              <span>💰 ₹18.4K opportunity</span>
            </div>
          </div>
          <button className={`primary ${executed ? "successBtn" : ""}`} onClick={executeAction} disabled={executing || executed}>
            {executing ? "Executing..." : executed ? "✓ Campaign Executed" : "Approve & Execute →"}
          </button>
        </section>

        {showReport && (
          <section className="reportGrid">
            <div className="card resultCard">
              <div className="successIcon">✓</div>
              <div>
                <div className="insightTag green">ACTION COMPLETE</div>
                <h3>Campaign executed successfully</h3>
                <p>EVENING-10OFF-2847 is live. Your AI teammate has moved from recommendation to action.</p>
              </div>
            </div>
            <div className="card miniResult">
              <span>Projected reach</span><strong>1,842</strong><small>customers</small>
            </div>
            <div className="card miniResult">
              <span>Expected lift</span><strong>+10.2%</strong><small>conversion</small>
            </div>
            <div className="card miniResult">
              <span>Revenue opportunity</span><strong>{money(18450)}</strong><small>estimated</small>
            </div>
          </section>
        )}

        <section className="bottomNote">
          <span>🛡️</span>
          <div><b>Built for safe autonomous commerce</b><br />AI recommends. Merchant approves. Every action is logged and reportable.</div>
        </section>
      </main>

      <footer>Merchant AI Teammate • Hackathon demo • Mock merchant data • No real transactions are executed</footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
