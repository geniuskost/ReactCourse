import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ui/Group.css';
import type IGroupProduct from '../../entities/group/model/IGroupProduct';
import GroupApi from '../../entities/group/api/GroupApi';
import ProductCard from './ui/ProductCard';
import GroupsWidget from '../../widgets/groups/GroupsWidget';

export default function Group() {
    const { slug } = useParams();
    const [groupProduct, setGroupProduct] = useState<IGroupProduct | undefined>();

    useEffect(() => {
        if (!slug) return;
        GroupApi.groupDetails(slug).then(setGroupProduct).catch(() => setGroupProduct(undefined));
    }, [slug]);

    return (
        <div className="container">
            <h1>{groupProduct?.group.name ?? slug}</h1>
            <GroupsWidget />
            {groupProduct ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {groupProduct.products.map((gp) => (
                        <ProductCard productBrief={gp} key={gp.id} />
                    ))}
                </div>
            ) : (
                <p>Завантаження…</p>
            )}
        </div>
    );
}
