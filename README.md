# Little BO kids store 🧸

Responsive хүүхдийн хувцас, хэрэгслийн онлайн дэлгүүрийн demo.

## Файлууд
- `index.html` — storefront
- `app.js` — бүтээгдэхүүн, хайлт, сагс, wishlist, Messenger захиалгын логик
- `admin.html` — бүтээгдэхүүн нэмэх/засах/устгах admin UI

## Admin
- Нэвтрэх нэр: `12345678`
- Нууц үг: `87654321`

> Энэ нь client-side demo тул нууц үг болон LocalStorage-д суурилсан admin нь production security биш. Бодит дэлгүүрт backend authentication + database ашиглах хэрэгтэй.

## Messenger
Захиалах товч дарахад захиалгын мэдээллийг clipboard-д хуулж Facebook page-ийн холбоосыг нээнэ. Ингэснээр хэрэглэгч Messenger чатанд мэдээллээ paste хийж илгээнэ. Facebook-ийн page username/ID тодорхой болсон үед жинхэнэ Messenger deep-link-д холбож болно.
