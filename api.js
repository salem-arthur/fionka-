const firebaseConfig = {
  apiKey: "AIzaSyBKjqDOlpAVjBWv5ZNhVRQXizJlNnFpsj0",
  authDomain: "fionka-f7f88.firebaseapp.com",
  projectId: "fionka-f7f88",
  storageBucket: "fionka-f7f88.firebasestorage.app",
  messagingSenderId: "552173935441",
  appId: "1:552173935441:web:bcd103924d0875989c9170",
};
firebase.initializeApp(firebaseConfig);
const _db = firebase.firestore();

function _ser(d) { return { id: parseInt(d.id), ...d.data() }; }
function _ts() { return new Date().toISOString(); }

const API = {
    token: localStorage.getItem('fionka_token'),
    setToken(t) { this.token = t; if (t) localStorage.setItem('fionka_token', t); else localStorage.removeItem('fionka_token'); },
    _get(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } },
    _set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) { console.warn(e); } },

    async loadProducts() {
        const snap = await _db.collection('products').orderBy('createdAt', 'desc').get();
        let list = snap.docs.map(_ser);
        if (!list.length) {
            const defs = [
                { id:1, name:'خاتم روز جولد', category:'rings', price:1250, rating:4.8, image:'https://placehold.co/600x600/ffccdd/ffffff?text=Rose+Ring', isNew:true, isBestseller:true, description:'خاتم مرصع بأحجار روز كوارتز الطبيعية', views:0, sales:0, salePercent:0, createdAt:_ts() },
                { id:2, name:'انسيال ألماس ناعم', category:'earrings', price:1890, rating:4.9, image:'https://placehold.co/600x600/f9ced2/ffffff?text=Diamond+Earrings', isNew:false, isBestseller:false, description:'انسيال من الألماس الأبيض عيار 18', views:0, sales:0, salePercent:0, createdAt:_ts() },
                { id:3, name:'سلسلة فيونكة', category:'necklaces', price:990, rating:4.7, image:'https://placehold.co/600x600/e6ccff/ffffff?text=Fionka+Necklace', isNew:true, isBestseller:false, description:'سلسلة فضة عيار 925 مع قلادة فيونكة', views:0, sales:0, salePercent:0, createdAt:_ts() },
                { id:4, name:'ساعة فاخرة ذهبية', category:'watches', price:3450, rating:5.0, image:'https://placehold.co/600x600/f5e0d0/ffffff?text=Luxury+Watch', isNew:false, isBestseller:true, description:'ساعة سويسرية بتصميم عصري أنيق', views:0, sales:0, salePercent:0, createdAt:_ts() },
                { id:5, name:'كابلز حب أبدي', category:'couples', price:2250, rating:4.9, image:'https://placehold.co/600x600/ffb3ba/ffffff?text=Couple+Set', isNew:false, isBestseller:false, description:'طقم كابلز مطلي بالذهب الوردي', views:0, sales:0, salePercent:0, createdAt:_ts() },
                { id:6, name:'خاتم سوليتير', category:'rings', price:4990, rating:5.0, image:'https://placehold.co/600x600/d9d2b0/ffffff?text=Solitaire+Ring', isNew:false, isBestseller:false, description:'خاتم ماسي سوليتير فاخر', views:0, sales:0, salePercent:0, createdAt:_ts() },
                { id:7, name:'انسيال لؤلؤ', category:'earrings', price:750, rating:4.6, image:'https://placehold.co/600x600/ffe0f0/ffffff?text=Pearl+Earrings', isNew:true, isBestseller:false, description:'لؤلؤ طبيعي مع إطار فضي ناعم', views:0, sales:0, salePercent:0, createdAt:_ts() },
                { id:8, name:'ساعة كاجوال روز', category:'watches', price:1890, rating:4.7, image:'https://placehold.co/600x600/fadadd/ffffff?text=Rose+Watch', isNew:false, isBestseller:false, description:'ساعة أنيقة بسوار من الجلد الطبيعي', views:0, sales:0, salePercent:0, createdAt:_ts() },
                { id:9, name:'سلسلة قلادة قلب', category:'necklaces', price:590, rating:4.5, image:'https://placehold.co/600x600/fce4ec/ffffff?text=Heart+Pendant', isNew:true, isBestseller:false, description:'قلادة بشكل قلب من الفضة عيار 925', views:0, sales:0, salePercent:0, createdAt:_ts() },
                { id:10, name:'كابلز ملكي', category:'couples', price:3200, rating:4.9, image:'https://placehold.co/600x600/e6c8d0/ffffff?text=Royal+Couple', isNew:false, isBestseller:true, description:'كابلز مطلي بالذهب عيار 24', views:0, sales:0, salePercent:0, createdAt:_ts() },
                { id:11, name:'طقم انسيال وخاتم', category:'rings', price:2100, rating:4.8, image:'https://placehold.co/600x600/f0d0ff/ffffff?text=Ring+Set', isNew:true, isBestseller:false, description:'طقم متناسق من انسيال وخاتم روز', views:0, sales:0, salePercent:0, createdAt:_ts() },
                { id:12, name:'سلسلة ذهب عيار 18', category:'necklaces', price:4200, rating:5.0, image:'https://placehold.co/600x600/f5e6a0/ffffff?text=Gold+Chain', isNew:false, isBestseller:true, description:'سلسلة ذهب أصفر عيار 18 قيراط', views:0, sales:0, salePercent:0, createdAt:_ts() },
            ];
            for (const p of defs) { await _db.collection('products').doc(String(p.id)).set(p); }
            return defs;
        }
        return list;
    },
    async getProduct(id) { const d = await _db.collection('products').doc(String(id)).get(); if (!d.exists) throw 'not found'; return _ser(d); },
    async saveProduct(p) { const id = p.id || Date.now(); const d = { ...p, id: undefined }; if (!p.id) d.createdAt = _ts(); await _db.collection('products').doc(String(id)).set(d, { merge: true }); return { ...d, id }; },
    async deleteProduct(id) { await _db.collection('products').doc(String(id)).delete(); return {}; },
    async incrementView(id) { await _db.collection('products').doc(String(id)).update({ views: firebase.firestore.FieldValue.increment(1) }); return {}; },
    async incrementSale(id) { await _db.collection('products').doc(String(id)).update({ sales: firebase.firestore.FieldValue.increment(1) }); return {}; },

    async loadReviews() { const s = await _db.collection('reviews').orderBy('date', 'desc').get(); return s.docs.map(d => _ser(d)); },
    async submitReview(r) { const id = Date.now(); await _db.collection('reviews').doc(String(id)).set(r); return { ...r, id }; },
    async deleteReview(id) { await _db.collection('reviews').doc(String(id)).delete(); return {}; },

    async loadOrders() { const s = await _db.collection('orders').orderBy('createdAt', 'desc').get(); return s.docs.map(d => _ser(d)); },
    async submitOrder(o) { const id = Date.now(); const d = { ...o, id: undefined, createdAt: _ts(), status: 'جديد' }; await _db.collection('orders').doc(String(id)).set(d); return { ...d, id }; },
    async updateOrderStatus(id, s) { await _db.collection('orders').doc(String(id)).update({ status: s }); return {}; },
    async deleteOrder(id) { await _db.collection('orders').doc(String(id)).delete(); return {}; },

    async loadMessages() { const s = await _db.collection('messages').orderBy('createdAt', 'desc').get(); return s.docs.map(d => _ser(d)); },
    async submitMessage(m) { const id = Date.now(); const d = { ...m, id: undefined, createdAt: _ts(), read: false }; await _db.collection('messages').doc(String(id)).set(d); return { ...d, id }; },
    async deleteMessage(id) { await _db.collection('messages').doc(String(id)).delete(); return {}; },

    async loadTexts() { const d = await _db.collection('config').doc('texts').get(); return d.exists ? d.data() : {}; },
    async saveTexts(t) { await _db.collection('config').doc('texts').set(t, { merge: true }); return {}; },

    async loadFaq() {
        const d = await _db.collection('config').doc('faq').get();
        if (!d.exists) {
            const defs = [
                { question:'كيف أتواصل لإتمام الدفع؟', answer:'بعد اختيار منتجاتك اضغط "إتمام الشراء" وسيتم تحويلك لواتساب الدعم.' },
                { question:'ما هي طرق الدفع المتاحة؟', answer:'فودافون كاش، إنستا باي، باي بال، بطاقة ائتمان، تحويل بنكي.' },
                { question:'ما مدة التوصيل؟', answer:'من 2 إلى 5 أيام عمل داخل مصر.' },
                { question:'ما سياسة الإرجاع؟', answer:'يمكنك الإرجاع خلال 14 يوماً من الاستلام.' },
                { question:'هل الشحن مجاني؟', answer:'الشحن مجاني على الطلبات التي تتجاوز 500 ج.م داخل مصر.' },
            ];
            await _db.collection('config').doc('faq').set({ items: defs });
            return defs;
        }
        return d.data().items || [];
    },
    async saveFaq(f) { await _db.collection('config').doc('faq').set({ items: f }); if (typeof window.applySavedFaq === 'function') window.applySavedFaq(); return {}; },

    async loadStats() {
        const p = await this.loadProducts();
        return {
            totalSales: p.reduce((s,x) => s+(x.sales||0),0),
            totalViews: p.reduce((s,x) => s+(x.views||0),0),
            ordersRevenue: (await this.loadOrders()).reduce((s,o) => s+(o.total||0),0),
            catCounts: Object.entries(p.reduce((a,x) => { a[x.category] = (a[x.category]||0)+1; return a; }, {})).map(([k,v]) => ({category:k, count:v})),
        };
    },

    async loadCountdown() { const d = await _db.collection('config').doc('countdown').get(); return d.exists ? d.data() : { target: null }; },
    async saveCountdown(t) { await _db.collection('config').doc('countdown').set(t); return {}; },

    async login(u, p) {
        const a = this._get('fionka_admin_auth', { username:'admin', password:'nChLQPQ4NYyOfXhr' });
        if (u === a.username && p === a.password) { const t = 'tok_' + Date.now(); this.setToken(t); return { token: t }; }
        throw { error:'بيانات الدخول غير صحيحة' };
    },
    async changePassword(c, n) {
        const a = this._get('fionka_admin_auth', { username:'admin', password:'nChLQPQ4NYyOfXhr' });
        if (c !== a.password) throw { error:'كلمة المرور الحالية غير صحيحة' };
        a.password = n; this._set('fionka_admin_auth', a); return {};
    },
};
