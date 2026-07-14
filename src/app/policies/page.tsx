import React from "react";
import { 
  Dog, 
  ShieldCheck, 
  FileText, 
  Info, 
  Utensils, 
  Receipt,
  CalendarCheck,
  CreditCard,
  Clock,
  AlertCircle,
  Gift,
  RefreshCw
} from "lucide-react";

export const metadata = {
  title: "Resort Policies | DurgBhumi",
  description: "Terms, conditions, meal plans, and guidelines for your stay at DurgBhumi Resort.",
};

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-[#0a0f0c] pt-32 pb-24 px-6 md:px-16">

      {/* Background Subtle Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-600/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif gold-text-gradient tracking-widest uppercase mb-4">
            Resort Policies
          </h1>
          <p className="text-xs md:text-sm tracking-[0.3em] text-white/50 uppercase">
            Terms, Conditions & Guidelines
          </p>
        </div>

        {/* ========================================================= */}
        {/* 🍽️ MEAL PLANS & TARIFF T&C SECTION                        */}
        {/* ========================================================= */}
        <section className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl mb-12 relative overflow-hidden group">
          <Utensils className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.02] rotate-12 pointer-events-none" />

          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6 relative z-10">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
              <Receipt className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wider">Meal Plans & Tariffs</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">T&C Applied</p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="p-5 mb-8 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-300 font-light leading-relaxed">
              <strong className="text-white tracking-widest uppercase text-xs block mb-1">General Terms:</strong> 
              All rates are in Indian Rupees (₹). Taxes (GST) shall be applicable extra. Tariffs are subject to revision without prior notice.
            </div>

            <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Utensils className="w-4 h-4" /> Meal Plan Definitions
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              {/* MAP Plan Card */}
              <div className="p-6 rounded-2xl bg-[#121814] border border-white/5 shadow-inner hover:border-yellow-500/30 transition-colors">
                <h5 className="text-xl font-serif text-white mb-2">MAP</h5>
                <p className="text-[10px] text-yellow-500 tracking-widest uppercase mb-3">(Modified American Plan)</p>
                <p className="text-sm text-gray-400 font-light mb-6 min-h-[40px]">
                  Room Stay with Breakfast & One Major Meal (Lunch or Dinner).
                </p>
                
                <ul className="space-y-3 text-sm text-gray-300 font-light border-t border-white/10 pt-4">
                  <li className="flex justify-between items-center">
                    <span>Double:</span> <span className="font-semibold text-white">₹3,000</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Extra Adult:</span> <span className="font-semibold text-white">₹1,500</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Extra Child <span className="text-[10px] text-gray-500">(upto 10 yrs)</span>:</span> <span className="font-semibold text-white">₹1,000</span>
                  </li>
                </ul>
              </div>

              {/* AP Plan Card */}
              <div className="p-6 rounded-2xl bg-[#121814] border border-white/5 shadow-inner hover:border-yellow-500/30 transition-colors">
                <h5 className="text-xl font-serif text-white mb-2">AP</h5>
                <p className="text-[10px] text-yellow-500 tracking-widest uppercase mb-3">(American Plan)</p>
                <p className="text-sm text-gray-400 font-light mb-6 min-h-[40px]">
                  Room Stay with Breakfast, Lunch & Dinner.
                </p>
                
                <ul className="space-y-3 text-sm text-gray-300 font-light border-t border-white/10 pt-4">
                  <li className="flex justify-between items-center">
                    <span>Double:</span> <span className="font-semibold text-white">₹6,000</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Extra Adult:</span> <span className="font-semibold text-white">₹3,000</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Extra Child <span className="text-[10px] text-gray-500">(upto 10 yrs)</span>:</span> <span className="font-semibold text-white">₹2,000</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 🐾 PET POLICY SECTION                                     */}
        {/* ========================================================= */}
        <section className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl mb-12 relative overflow-hidden group">
          <Dog className="absolute -bottom-10 -right-10 w-64 h-64 text-white/[0.02] rotate-12 pointer-events-none" />

          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6 relative z-10">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
              <Dog className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wider">Pet Guidelines</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Furry Friends Welcome</p>
            </div>
          </div>

          <div className="relative z-10">
            <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mb-8">
              We are delighted to welcome your four-legged companions to DurgBhumi Resort. To ensure a comfortable, safe, and enjoyable experience for all guests, we request pet owners to kindly follow the guidelines below.
            </p>

            <div className="mb-8 p-6 rounded-2xl bg-[#121814] border border-white/5 shadow-inner">
              <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-2 mb-4">
                <Info className="w-4 h-4" /> Pet Charges
              </h4>
              <ul className="space-y-4 text-sm text-gray-200 font-light">
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-white/5 pb-3 gap-2">
                  <span>Pet Fee (Non-Refundable):</span>
                  <span className="font-semibold text-white">₹1,500 <span className="text-[10px] text-gray-400 font-light">per pet / per stay</span></span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-1 gap-2">
                  <span>Security Deposit (Refundable*):</span>
                  <span className="font-semibold text-white">₹5,000 <span className="text-[10px] text-gray-400 font-light">per pet</span></span>
                </li>
                <p className="text-[10px] text-gray-500 italic mt-2">
                  * Refundable upon checkout, subject to room inspection and no damages.
                </p>
              </ul>
            </div>

            <h4 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-yellow-500" /> Rules and Regulations
            </h4>
            <ul className="space-y-3 text-sm md:text-base text-gray-300 font-light list-disc pl-5 marker:text-yellow-500/50 mb-8 leading-relaxed">
<li>Only Dogs and cats are welcome.</li>
              <li>Only one (1) pet per guest room is permitted.</li>
              <li>Pets must be healthy, vaccinated, and well-behaved.</li>
              <li><span className="text-red-400 font-medium">Restricted Areas:</span> Pets are not permitted in Restaurants & Dining Venues, Banquet & Event Spaces, Swimming Pool Area, Spa & Wellness Areas, Kitchen & Service Areas.</li>
              <li>Pets must be kept on a leash in all outdoor and public areas of the resort.</li>
              <li>Pets must not be left unattended in guest rooms.</li>
              <li>Guests must carry waste bags and dispose of pet waste responsibly.</li>
              <li>Any damage, excessive cleaning, stains, odors, or repairs resulting from a pet&apos;s stay will be charged to the guest.</li>
            </ul>

            <div className="p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-gray-400 leading-relaxed italic">
              <strong>Disclaimer:</strong> DurgBhumi Resort reserves the right to refuse or discontinue pet accommodation if a pet causes disturbance, poses a safety risk, or if the above guidelines are not followed. We look forward to hosting you and your furry companion for a memorable stay.
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 🏨 BOOKING & PAYMENT TERMS                                */}
        {/* ========================================================= */}
        <section className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl mb-12 relative">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <CalendarCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wider">Booking & Payment</h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Effective Date: 16-6-26</p>
            </div>
          </div>

          <p className="text-sm text-gray-300 font-light leading-relaxed mb-8">
            To ensure a seamless booking experience and fair allocation of inventory, the following terms and conditions shall apply to all reservations made with the Resort.
          </p>

          {/* 1. Booking Confirmation */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-4">1. Booking Confirmation</h4>
            <ul className="space-y-2 text-sm text-gray-300 font-light list-disc pl-5 marker:text-white/30">
              <li>All reservations are subject to availability and confirmation by the Resort.</li>
              <li>A booking shall be deemed confirmed only upon receipt of the prescribed advance payment and issuance of a booking confirmation by the Resort.</li>
              <li>Room allocation, views, room numbers, and specific locations within the property are subject to availability at the time of check-in.</li>
              <li>The Resort reserves the right to decline or cancel any reservation in case of incorrect pricing, technical errors, force majeure events, or non-compliance with booking terms.</li>
            </ul>
          </div>

          {/* 2. Payment Terms */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4" /> 2. Payment Terms
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-[#121814] border border-white/5">
                <h5 className="text-white font-medium mb-3 border-b border-white/10 pb-2">Individual Reservations</h5>
                <ul className="text-xs text-gray-400 space-y-3 font-light">
                  <li><strong className="text-gray-200">More than 30 days:</strong> Pencil Booking (Temporary Booking on portal).</li>
                  <li><strong className="text-gray-200">15 days before check-in:</strong> 50% advance payment to confirm. In case of No Show we will release inventory for others. Balance amount payable at least 7 days prior to arrival.</li>
                  <li><strong className="text-gray-200">Within 7 days of check-in:</strong> 100% advance payment required.</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl bg-[#121814] border border-white/5">
                <h5 className="text-white font-medium mb-3 border-b border-white/10 pb-2">Group Bookings <span className="text-[10px] text-gray-500">(5+ Rooms)</span></h5>
                <ul className="text-xs text-gray-400 space-y-3 font-light">
                  <li>50% advance payment upon confirmation.</li>
                  <li>Additional 25% payment 15 days before arrival.</li>
                  <li>Remaining balance 7 days before check-in.</li>
                  <li>Confirmed only after receipt of advance payment and guest rooming details.</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl bg-[#121814] border border-white/5">
                <h5 className="text-white font-medium mb-3 border-b border-white/10 pb-2">Events & Corporate</h5>
                <ul className="text-xs text-gray-400 space-y-3 font-light">
                  <li>50% advance payment at confirmation.</li>
                  <li>25% payment 30 days before the event.</li>
                  <li>Balance 25% payment 7 days before the event.</li>
                  <li>Additional consumption/damages billed separately, payable before departure.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Security Deposit & 8. Child Policy & 9. Check-in/out & 11. Important Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
            <div>
              <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">3. Security Deposit</h4>
              <p className="text-sm text-gray-300 font-light mb-2">Refundable security deposit may be requested at check-in for:</p>
              <ul className="text-sm text-gray-400 font-light list-disc pl-5 marker:text-white/30 mb-6">
                <li>Large groups & Corporate events</li>
                <li>Exclusive property bookings</li>
                <li>Long-stay guests & Personal Pets</li>
              </ul>
              
              <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4" /> 9. Check-In & Check-Out
              </h4>
              <ul className="text-sm text-gray-400 font-light space-y-2 mb-6">
                <li><strong className="text-white">Check-In Time:</strong> 02:00 PM</li>
                <li><strong className="text-white">Check-Out Time:</strong> 11:00 AM</li>
                <li>Early check-in and late check-out are subject to availability and additional charges.</li>
                <li>Guests must produce valid government-issued photo ID upon arrival.</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">8. Child Policy</h4>
              <ul className="text-sm text-gray-400 font-light list-disc pl-5 marker:text-white/30 mb-6">
                <li>Below 5 years: Stay complimentary (sharing existing bedding).</li>
                <li>5 to 12 years: Charged as per applicable child rate.</li>
                <li>Above 12 years: Treated as adults and charged accordingly.</li>
              </ul>

              <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">11. Important Conditions</h4>
              <ul className="text-sm text-gray-400 font-light list-disc pl-5 marker:text-white/30 space-y-2">
                <li>Tariffs subject to revision without prior notice until booking is confirmed.</li>
                <li>Special requests subject to availability.</li>
                <li>Outside food, beverages, speakers, DJs, fireworks, or commercial activities require prior written approval.</li>
                <li>Resort reserves right to cancel due to pricing errors, fraud, or policy violations.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* ❌ CANCELLATION, REFUND & RESCHEDULING                    */}
        {/* ========================================================= */}
        <section className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl mb-12 relative">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wider">Cancellation & Refund</h2>
            </div>
          </div>

          {/* Table Summary */}
          <div className="mb-10">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Cancellation Charges Summary</h4>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-white/5 text-yellow-500 uppercase tracking-widest text-xs">
                  <tr>
                    <th className="px-6 py-4 border-b border-white/10 font-medium">Time Before Check-In</th>
                    <th className="px-6 py-4 border-b border-white/10 font-medium">Refund Applicable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-[#121814]">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">More than 30 Days</td>
                    <td className="px-6 py-4 text-green-400 font-medium">90% Refund</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">15–30 Days</td>
                    <td className="px-6 py-4 text-yellow-400 font-medium">50% Refund</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">8–14 Days</td>
                    <td className="px-6 py-4 text-yellow-400 font-medium">50% Refund</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">0–7 Days</td>
                    <td className="px-6 py-4 text-red-400 font-medium">No Refund</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors bg-red-950/10">
                    <td className="px-6 py-4">No Show</td>
                    <td className="px-6 py-4 text-red-400 font-medium">No Refund</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors bg-red-950/10">
                    <td className="px-6 py-4">Early Departure</td>
                    <td className="px-6 py-4 text-red-400 font-medium">No Refund</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* 4. Cancellation Policy Detail */}
            <div>
              <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">4. Cancellation Policy</h4>
              <div className="space-y-4">
                <div>
                  <strong className="text-xs text-white uppercase block mb-1">Peak Season / Long Weekends / Festivals</strong>
                  <ul className="text-xs text-gray-400 font-light list-disc pl-4 space-y-1">
                    <li>&gt; 30 days before arrival: 90% refund.</li>
                    <li>15–30 days before arrival: 50% refund.</li>
                    <li>&lt; 15 days before arrival: No refund.</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-xs text-white uppercase block mb-1">Regular Season Bookings</strong>
                  <ul className="text-xs text-gray-400 font-light list-disc pl-4 space-y-1">
                    <li>&gt; 15 days before arrival: 90% refund.</li>
                    <li>8–15 days before arrival: 50% refund.</li>
                    <li>7 days or less before arrival: No refund.</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-xs text-white uppercase block mb-1">Group, Corporate & Event Bookings</strong>
                  <ul className="text-xs text-gray-400 font-light list-disc pl-4 space-y-1">
                    <li>&gt; 30 days before arrival: 75% refund.</li>
                    <li>15–30 days before arrival: 50% refund.</li>
                    <li>&lt; 15 days before arrival: No refund.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 5. Refund, 6. Rescheduling, 7. No Show */}
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">5. Refund Policy</h4>
                <ul className="text-xs text-gray-400 font-light list-disc pl-4 space-y-1">
                  <li>Approved refunds processed within 15 working days.</li>
                  <li>Payment gateway, bank, and taxes are non-refundable.</li>
                  <li>Refunds made only through original mode of payment.</li>
                  <li>Cash refunds will not be entertained.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <RefreshCw className="w-3 h-3" /> 6. Rescheduling Policy
                </h4>
                <ul className="text-xs text-gray-400 font-light list-disc pl-4 space-y-1">
                  <li>One complimentary date change allowed if requested at least 15 days prior.</li>
                  <li>Subject to availability and prevailing tariffs (rate difference borne by guest).</li>
                  <li>Requests within 7 days may not be accommodated.</li>
                  <li>Promotional packages may not be eligible for modifications.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">7. No-Show & Early Departure</h4>
                <ul className="text-xs text-gray-400 font-light list-disc pl-4 space-y-1">
<li>Failure to arrive without prior written communication is a &quot;No-Show&quot;.</li>
                  <li>No refund for no-shows or early departures (including unused meals/activities).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 10. Force Majeure & Notes */}
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> 10. Force Majeure
              </h4>
              <p className="text-sm text-gray-400 font-light mb-2">The Resort shall not be liable for cancellations, delays, or disruptions due to events beyond control, including:</p>
              <p className="text-xs text-gray-500 font-light">Natural disasters, floods, extreme weather, government restrictions, road closures, pandemics, civil disturbances, power/utility failures.</p>
              <p className="text-xs text-gray-400 font-light italic mt-2">In such cases, the Resort may offer a credit note or alternate stay dates at its sole discretion.</p>
            </div>

            <div className="p-5 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-xs text-gray-400 leading-relaxed">
              <strong className="text-white mb-2 block">Important Notes:</strong>
              <ul className="list-disc pl-4 space-y-2">
                <li>As the Resort blocks inventory exclusively for confirmed guests and often turns away other enquiries, cancellation charges are necessary to compensate for lost booking opportunities. Guests are requested to carefully review travel plans before confirming.</li>
                <li>By confirming a reservation, the guest acknowledges and accepts all booking, payment, cancellation, refund, and resort policies stated herein.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 🎁 REFERRAL & DISCOUNT POLICY                             */}
        {/* ========================================================= */}
        <section className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl mb-12">
          <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-serif text-white tracking-wider">Referral & Management Discounts</h2>
            </div>
          </div>
          
          <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
            To encourage guest referrals and acknowledge valuable recommendations, the Resort may extend special discretionary discounts subject to prior approval from the Management.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">Referral & Courtesy Discounts</h4>
              <ul className="text-sm text-gray-400 font-light list-disc pl-5 marker:text-white/30 space-y-2 mb-6">
                <li>Guests referred by Resort Owners, Directors, Management Team, Business Associates, or Authorized Referral Partners may be eligible.</li>
                <li>Discounts are offered solely at management&apos;s discretion and are not guaranteed.</li>
                <li>Requires prior written or verbal approval from management before booking confirmation.</li>
                <li>Cannot be combined with any other promotional offer, corporate rate, or OTA offer.</li>
              </ul>

              <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">Applicable Discount Structure</h4>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#121814] border border-white/5">
                  <span className="text-white text-xs uppercase block mb-1">Weekdays (Mon-Thu)</span>
                  <span className="text-yellow-400 text-sm font-medium">Up to 30% discount</span>
                  <span className="text-xs text-gray-500 block">of the applicable room tariff/package value</span>
                </div>
                <div className="p-4 rounded-xl bg-[#121814] border border-white/5">
                  <span className="text-white text-xs uppercase block mb-1">Weekends & Holidays (Fri-Sun & Peak)</span>
                  <span className="text-yellow-400 text-sm font-medium">Up to 15% discount</span>
                  <span className="text-xs text-gray-500 block">of the applicable room tariff/package value</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest mb-3">Adjustment & Utilization</h4>
              <p className="text-sm text-gray-400 font-light mb-4">The approved discount may be utilized in either of the following ways:</p>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <strong className="text-white text-sm block mb-1">Option A – Guest Benefit</strong>
                  <p className="text-xs text-gray-400 font-light">The discount may be adjusted directly against the guest&apos;s final accommodation or package invoice.</p>
                </div>
                <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
                  <strong className="text-white text-sm block mb-1">Option B – Referral Appreciation</strong>
                  <p className="text-xs text-gray-400 font-light">The equivalent value may be extended to the referring individual as a goodwill gesture, felicitation, referral reward, or thank-you benefit.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 italic">
                Management&apos;s decision regarding eligibility, discount percentage, and adjustment mechanism shall be final and binding.
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}